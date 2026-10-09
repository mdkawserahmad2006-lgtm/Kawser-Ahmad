   
                                                                                     
                                                                
   

const CFG = {
    gravity: 0.85,
    speed: 6.0,
    jump: -13.0,
    wallJumpX: 8,
    wallJumpY: -12,
    grappleCD: 40,
    attackRange: 45, 
    shootRange: 250, 
    knockbackX: 16,
    knockbackY: -8,
    impactForce: 1.2,
    maxHp: 100,
    kickDmg: 22,
    dropkickDmg: 35,
    spinDmg: 18,
    tauntTime: 90,
    doubleJumpVy: -11
};

class Particle {
    constructor(x, y, vx, vy, color, life) {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy;
        this.color = color; this.life = life; this.maxLife = life;
    }
    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

class Bullet {
    constructor(x, y, dir, color, ownerId) {
        this.x = x; this.y = y;
        this.vx = dir * 25; 
        this.color = color;
        this.ownerId = ownerId;
        this.active = true;
    }
    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.fillRect(this.x, this.y, 8, 2);
        ctx.shadowBlur = 0;
    }
}

class Decal {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.life = 400; this.maxLife = 400; 
        this.splats = [];
        for(let i=0; i<6; i++) {
            this.splats.push({ dx: (Math.random()-0.5)*20, dy: (Math.random()-0.5)*20, r: 1 + Math.random()*4 });
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, (this.life / this.maxLife) * 0.6);
        this.splats.forEach(s => {
            ctx.beginPath(); ctx.arc(this.x+s.dx, this.y+s.dy, s.r, 0, Math.PI*2); ctx.fill();
        });
        ctx.globalAlpha = 1.0;
    }
}

class SpeechBubble {
    constructor(x, y, text, color) {
        this.x = x; this.y = y; this.text = text; this.color = color;
        this.life = 70; this.maxLife = 70;
        this.vy = -0.8;
    }
    draw(ctx) {
        const alpha = Math.min(1, this.life / 20) * (this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        const pad = 5;
        ctx.font = 'bold 13px monospace';
        const tw = ctx.measureText(this.text).width;
        const bw = tw + pad * 2, bh = 18;
        const bx = this.x - bw / 2, by = this.y - bh;
        ctx.fillStyle = '#111';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 4);
        else ctx.rect(bx,by,bw,bh);
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
               
        ctx.beginPath();
        ctx.moveTo(this.x - 4, this.y);
        ctx.lineTo(this.x + 4, this.y);
        ctx.lineTo(this.x, this.y + 6);
        ctx.closePath();
        ctx.fillStyle = '#111';
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, by + bh / 2);
        ctx.restore();
    }
}

class Item {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.w = 14; this.h = 14;
        this.type = Math.random() < 0.5 ? 'hp' : 'speed';
        this.color = this.type === 'hp' ? '#00ff88' : '#ffcc00';
        this.life = 600;                
        this.bobOffset = Math.random() * Math.PI * 2;
        this.collected = false;
    }
    draw(ctx, frame) {
        if (this.collected) return;
        const bob = Math.sin(frame * 0.05 + this.bobOffset) * 3;
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2 + bob);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        if (this.type === 'hp') {
                           
            ctx.beginPath();
            ctx.moveTo(-5, 0); ctx.lineTo(5, 0);
            ctx.moveTo(0, -5); ctx.lineTo(0, 5);
            ctx.stroke();
        } else {
                             
            ctx.beginPath();
            ctx.moveTo(3, -6); ctx.lineTo(-2, 0); ctx.lineTo(2, 0); ctx.lineTo(-3, 6);
            ctx.stroke();
        }
        ctx.restore();
    }
}

class Stickman {
    constructor(id, color) {
        this.id = id; this.color = color;
        this.w = 10; this.h = 24; 
        this.x = window.scrollX + (Math.random() * window.innerWidth);
        this.y = window.scrollY + 100;
        this.vx = 0; this.vy = 0;
        this.facingRight = true;
        this.grounded = false; this.onWall = false; this.wallSide = 0;
        this.frame = Math.random() * Math.PI * 2;
        this.state = 'fall'; 
        
        this.hp = CFG.maxHp;
        this.stunTimer = 0;
        this.actionTimer = 0;
        this.laydownTimer = 0;
        
        this.escapeTargetX = null; 
        this.dragged = false;
        this.isCrawling = false;
        
                                                                     
        this.ignorePlatformUuid = null;
        this.targetFloor = null;
        this.fallTimer = 0;
        
        this.trail = []; 
        this.rope = { active: false, ax: 0, ay: 0, tipX: 0, tipY: 0, prog: 0, cd: 0 };

                                                                              
        this.coyoteTimer = 0;

                                                            
        this.landingSquash = 0;
        this.landingVelocity = 0;                                           

                                 
        this.groggyTimer = 0;

                     
        this.ledgeHang = null;                             
        this.ledgePullTimer = 0;                                   

                                    
        this.idleTimer = 0;                             
        this.idleAction = '';                           

                         
        this.isReviving = false;
                                                      
        this.combatCD = 0;

                                                  
        this.doubleJumpUsed = false;
        this.tauntTimer = 0;
        this.speedBoost = 0;
        this.spinAngle = 0;
        this.brain = new NavBrain();                           
        this.stuckFrames = 0;                                         
        this.lastNavX = 0;
    }
}


                                                                            
                                         
                                                                     
                                               
                                                                            
class NavBrain {
    constructor() {
        this.waypoint  = null;                                
        this.timer     = 0;
        this.stuckTimer = 0;
        this.lastX     = 0;
    }

                                                                              
    getPlatformAt(px, py, platforms) {
        let best = null, bestDist = 80;
        for (const pl of platforms) {
            if (pl.y < py) continue;                           
            const dist = pl.y - py;
            if (dist < bestDist && px >= pl.x - 10 && px <= pl.x + pl.w + 10) {
                best = pl; bestDist = dist;
            }
        }
        return best;
    }

                                                                       
    sameLevel(srcPl, tgtPl) {
        return srcPl && tgtPl && Math.abs(srcPl.y - tgtPl.y) < 8;
    }

                                                                         
    platformAbove(srcPl, targetX, platforms, minH = 20, maxH = 220) {
        let best = null, bestScore = Infinity;
        for (const pl of platforms) {
            if (pl.isFloor) continue;
            const rise = srcPl.y - pl.y;
            if (rise < minH || rise > maxH) continue;
                                                             
            const hDist = Math.abs((pl.x + pl.w / 2) - targetX);
            const score = hDist + rise * 0.5;
            if (score < bestScore) { bestScore = score; best = pl; }
        }
        return best;
    }

                                                                        
    platformBelow(srcPl, targetX, platforms) {
        let best = null, bestScore = Infinity;
        for (const pl of platforms) {
            const drop = pl.y - srcPl.y;
            if (drop < 10 || drop > 600) continue;
            const hDist = Math.abs((pl.x + pl.w / 2) - targetX);
            const score = hDist + drop * 0.3;
            if (score < bestScore) { bestScore = score; best = pl; }
        }
        return best;
    }

    compute(p, targetX, targetY, platforms) {
        this.timer++;

                                                                
        if (this.timer % 40 === 0) {
            const moved = Math.abs(p.x - this.lastX);
            if (moved < 4 && this.waypoint && this.waypoint.action !== 'arrived') {
                this.stuckTimer++;
                if (this.stuckTimer >= 1) {                                            
                    this.waypoint = null;
                    this.stuckTimer = 0;
                                                                      
                    this._dropFlip = !this._dropFlip;
                }
            } else {
                this.stuckTimer = 0;
            }
            this.lastX = p.x;
        }

                                                     
        if (this.timer % 20 !== 0 && this.waypoint) return this.waypoint;

        const px = p.x + p.w / 2;
        const py = p.y + p.h / 2;
        const ddx = targetX - px;
        const ddy = targetY - py;
        const dist2D = Math.hypot(ddx, ddy);

                                                                           
        if (dist2D < 28) {
            this.waypoint = { x: targetX, y: targetY, action: 'arrived', jumpNeeded: false };
            return this.waypoint;
        }

                                                                            
        const myPl  = this.getPlatformAt(px, p.y + p.h - 2, platforms);
        const tgtPl = this.getPlatformAt(targetX, targetY + p.h / 2, platforms);

                                                                            
        if (myPl && tgtPl && this.sameLevel(myPl, tgtPl)) {
            this.waypoint = { x: targetX, y: targetY, action: 'walk', jumpNeeded: false };
            return this.waypoint;
        }

                                                                             
        if (ddy < -50 && p.grounded && myPl) {
                                                                          
            const bridge = this.platformAbove(myPl, targetX, platforms, 20, 145);
            if (bridge) {
                                                               
                const bx = bridge.x + bridge.w / 2;
                const walkFirst = Math.abs(px - bx) > 60;
                this.waypoint = {
                    x: walkFirst ? bx : targetX,
                    y: bridge.y,
                    action: 'jump',
                    jumpNeeded: true
                };
            } else {
                                                                  
                this.waypoint = { x: targetX, y: targetY, action: 'jump', jumpNeeded: true };
            }
            return this.waypoint;
        }

                                                                             
        if (ddy > 50 && p.grounded && myPl && !myPl.isFloor) {
            const vw = window.innerWidth;
            const isWide = myPl.w > vw * 0.65;                                           

            if (isWide) {
                                                                             
                const baseDir = targetX > px ? 1 : -1;
                const dir = this._dropFlip ? -baseDir : baseDir;
                const dropX = dir > 0
                    ? Math.min(window.scrollX + vw - 20, px + 60)               
                    : Math.max(window.scrollX + 20, px - 60);                   
                this.waypoint = { x: dropX, y: myPl.y, action: 'drop', jumpNeeded: false };
            } else {
                                                                                 
                const dropLeft  = Math.abs(myPl.x - targetX);
                const dropRight = Math.abs((myPl.x + myPl.w) - targetX);
                let dropX = dropLeft < dropRight ? myPl.x - 12 : myPl.x + myPl.w + 12;
                                                                                         
                dropX = Math.max(window.scrollX + 10, Math.min(window.scrollX + vw - 10, dropX));
                this.waypoint = { x: dropX, y: myPl.y, action: 'drop', jumpNeeded: false };
            }
            return this.waypoint;
        }

                                                                             
                                                                 
        this.waypoint = { x: targetX, y: targetY, action: 'walk', jumpNeeded: Math.abs(ddx) > 20 && ddy < -20 };
        return this.waypoint;
    }
}

class StickmanParkour {
    constructor() {
        this.destroyed=false;this.departed=false;this.paused=false;this.mode='explore';this.quality='auto';this.grabEnabled=false;this.talkEnabled=true;this.talkTimer=420;this.pace=1;
        this.listeners=[];this.handles=[];this.lastPointerTime=0;this.lastDrawTime=0;this.compact=window.matchMedia('(pointer: coarse)').matches;
        const on=(target,type,listener,options)=>{target.addEventListener(type,listener,options);this.listeners.push([target,type,listener,options]);};

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:40;transform:translateZ(0);';
        if (!this.ctx) { this.destroyed=true;return; }
        document.body.appendChild(this.canvas);

        this.mouseX = window.scrollX + window.innerWidth / 2;
        this.mouseY = window.scrollY + window.innerHeight / 2;
        this.destination=null;this.destinationTicks=0;this.pendingTap=null;
        this.lastTouchTime = Date.now();
        this.touchActive = false;
        this.wanderTimer = 0;
        this.lastScrollY = window.scrollY;

        this.platforms = [];
        this.particles = [];
        this.decals = []; 
        this.bullets = [];

        this.players = [
            new Stickman(0, '#00ffcc'),
            new Stickman(1, '#ffaa00'),
            new Stickman(2, '#aa55ff')
        ];
        this.speechBubbles = [];
        this.items = [];
        this.itemSpawnTimer = 0;
        this.frame = 0;

        on(window, 'resize', () => this.onResize());
        
        let lastMoveTime = performance.now();
        let lastCursorY = this.mouseY;
        const trackCursor = event => {
            if (this.paused || this.destroyed || this.departed || this.reducedMotion?.matches) return;
            const x = event.clientX + window.scrollX;
            const y = event.clientY + window.scrollY;

            // If user moves mouse significantly (>35px), resume active cursor chase immediately
            if (this.destination && Math.hypot(x - this.destination.x, y - this.destination.rawY) > 35) {
                this.destination = null;
            }

            if ((event.pointerType === 'touch' || this.destination) && !this.dragTarget) return;

            const now = performance.now();
            const dt = Math.max(8, now - lastMoveTime);
            const dy = y - lastCursorY; // negative when cursor moves UP

            // Spider-Man Web trigger: cursor moving quickly upward from below
            if (dy < -20 && dt < 150 && !this.dragTarget) {
                this.players.forEach(p => {
                    if (p.y > y + 40 && !p.rope.active && p.rope.cd <= 0) {
                        this.fireRope(p, x + (p.id - 1) * 28, Math.max(window.scrollY + 15, y - 20));
                    }
                });
            }

            lastCursorY = y;
            lastMoveTime = now;
            this.lastTouchTime = Date.now();
            this.mouseX = x;
            this.mouseY = y;

            if (this.dragTarget && event.pointerId === this.dragPointerId) {
                const pdt = Math.max(8, Math.min(64, performance.now() - this.lastPointerTime));
                this.dragTarget.vx = Math.max(-20, Math.min(20, (x - this.dragLastX) * 16.667 / pdt));
                this.dragTarget.vy = Math.max(-20, Math.min(20, (y - this.dragLastY) * 16.667 / pdt));
                this.dragTarget.x = Math.max(window.scrollX, Math.min(window.scrollX + window.innerWidth - this.dragTarget.w, x - this.dragTarget.w / 2));
                this.dragTarget.y = Math.max(window.scrollY + 20, Math.min(window.scrollY + window.innerHeight - this.dragTarget.h, y - this.dragTarget.h / 2));
                this.dragLastX = x; this.dragLastY = y; this.lastPointerTime = performance.now();
            }
        };
        this.endDrag=()=>{
            if (this.dragTarget) { this.dragTarget.dragged=false;this.dragTarget.state='ninja_flip';this.dragTarget.stunTimer=0;this.dragTarget=null; }
            this.touchActive=false;this.dragPointerId=null;
            const handle=this.dragHandle, id=this.capturedPointerId;this.dragHandle=null;this.capturedPointerId=null;
            if(handle?.hasPointerCapture?.(id))handle.releasePointerCapture(id);
        };
        this.beginDrag=(event,player)=>{
            if (!this.grabEnabled || this.paused || this.destroyed || this.departed || this.reducedMotion.matches) return;
            this.endDrag();
            this.dragTarget=player;this.dragHandle=event.currentTarget;this.capturedPointerId=event.pointerId;this.dragPointerId=event.pointerId;this.touchActive=event.pointerType==='touch';
            player.dragged=true;player.rope.active=false;player.ledgeHang=null;player.state='fall';player.vx=player.vy=0;player.escapeTargetX=null;
            this.dragLastX=event.clientX+window.scrollX;this.dragLastY=event.clientY+window.scrollY;this.lastPointerTime=performance.now();
            event.currentTarget.setPointerCapture?.(event.pointerId);
            event.preventDefault();
        };
        on(window,'pointerdown',event=>{
            if(this.paused || this.destroyed || this.departed || this.reducedMotion.matches || event.isPrimary===false || (event.button!=null && event.button!==0) || event.target.closest?.('.playground-dock,.stickman-grab,input,textarea,select,[contenteditable],dialog'))return;
            this.pendingTap={id:event.pointerId,x:event.clientX,y:event.clientY,sx:window.scrollX,sy:window.scrollY};
        },{passive:true});
        on(window,'pointerup',event=>{
            const tap=this.pendingTap;this.pendingTap=null;
            if(tap && tap.id===event.pointerId && !this.dragTarget && Math.hypot(event.clientX-tap.x,event.clientY-tap.y)<16 && Math.abs(window.scrollY-tap.sy)<12 && Math.abs(window.scrollX-tap.sx)<12) {
                const destX = event.clientX + window.scrollX;
                const destY = event.clientY + window.scrollY;
                this.setDestination(destX, destY);
                this.players.forEach(p => {
                    if (destY < p.y - 45 && !p.rope.active && p.rope.cd <= 0) {
                        this.fireRope(p, destX + (p.id - 1) * 24, destY);
                    } else if (p.grounded) {
                        p.state = 'ninja_flip';
                        p.vy = -8 - Math.random() * 4;
                        p.vx = Math.sign(destX - p.x) * (6 + Math.random() * 3);
                        p.grounded = false;
                    }
                });
            }
        },{passive:true});
        on(window,'pointercancel',()=>{this.pendingTap=null;},{passive:true});
        on(window,'pointermove',trackCursor,{passive:true});
        on(window,'pointerup',event=>{if(event.pointerId===this.dragPointerId)this.endDrag();});
        on(window,'pointercancel',()=>this.endDrag());
        on(window,'blur',()=>this.endDrag());
        on(window, 'scroll', () => {
            let currentScrollY = window.scrollY;
            let deltaY = currentScrollY - this.lastScrollY;
            this.lastScrollY = currentScrollY;
            if(this.paused || this.departed || document.hidden || this.destroyed)return;

            if (Math.abs(deltaY) > 5) {
                this.players.forEach(p => {
                    if (p.laydownTimer > 0 || p.dragged) return;

                    if (deltaY > 0) {
                        p.vy = 8; 
                        p.y += 10; 
                        p.grounded = false;
                        p.state = 'fall';
                    } else if (deltaY < -15) {
                        let screenBottom = currentScrollY + window.innerHeight;
                        if (p.y > screenBottom - 150 && p.grounded) {
                            p.state = 'laydown';
                            p.laydownTimer = 40; 
                            p.vx = p.facingRight ? 8 : -8; 
                        }
                    }
                });
            }
        }, {passive: true});
        
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.rafId = null;
        this.lastFrameTime = 0;
        this.accumulator = 0;
        this.scanTimer = null;
        this.lastScrollTime = 0;
        this.boundLoop = time => this.loop(time);
        const stop = () => {
            if (this.rafId !== null) cancelAnimationFrame(this.rafId);
            this.rafId = null;
            this.lastFrameTime = 0;
            this.accumulator = 0;
            this.lastDrawTime = 0;
            this.endDrag();this.hideHandles();
            clearTimeout(this.scanTimer);
            this.scanTimer = null;
        };
        const resume = () => {
            if (this.destroyed || this.departed || this.paused || document.hidden || this.rafId !== null) return;
            this.scheduleScan();
            if (!this.reducedMotion.matches) this.rafId = requestAnimationFrame(this.boundLoop);
            else this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.stop=stop;this.resume=resume;
        on(document, 'visibilitychange', () => { if(document.hidden) {stop();this.hideHandles();}else resume(); });
        on(window, 'pagehide', event=>{this.departed=true;stop();this.hideHandles();if(!event.persisted)this.destroy();});
        on(window, 'pageshow', ()=>{this.departed=false;resume();});
        on(this.reducedMotion, 'change', () => { stop(); resume(); });
        on(window, 'scroll', () => {
            this.lastScrollTime = performance.now();
            this.scheduleScan();
        }, {passive: true});
        on(document, 'load', event => {
            if (event.target.tagName === 'IMG') this.scheduleScan();
        }, true);
        this.layoutObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => this.scheduleScan()) : null;
        if (this.layoutObserver) this.layoutObserver.observe(document.body);
        this.contentObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(() => this.scheduleScan()) : null;
        if (this.contentObserver) this.contentObserver.observe(document.body, {childList:true, subtree:true, characterData:true});
        if (document.fonts) document.fonts.ready.then(() => this.scheduleScan());
        on(window,'uitf:play',event=>{
            const detail=event.detail || {};
            if(detail.state)this.configure(detail.state);
            if(detail.action)this.command(detail.action);
        });
        this.onResize();
        if(window.UITFPlayground)this.configure(window.UITFPlayground.state);
        else resume();
    }

    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.scheduleScan();
    }

    scheduleScan() {
        clearTimeout(this.scanTimer);
        if (this.destroyed || this.departed || this.paused || document.hidden) return;
        this.scanTimer = setTimeout(() => {
            this.scanTimer = null;
            if (!this.destroyed && !this.departed && !this.paused && !document.hidden) this.scanDOM();
        }, 180);
    }

    scanDOM() {
        this.platforms=[];const sx=window.scrollX,sy=window.scrollY;
        const add=(el,r,line=0)=>{
            if(this.platforms.length>=240 || r.width<8 || r.height<3 || r.top>window.innerHeight+300 || r.bottom<-300)return;
            if(!el.dataset.uuid)el.dataset.uuid=Math.random().toString(36).slice(2)+this.platforms.length;
            this.platforms.push({x:r.left+sx,y:(el.tagName==='IMG' ? r.top : r.bottom)+sy,w:r.width,h:6,oneWay:true,key:el.dataset.uuid+':'+line,el});
        };
        const candidates=document.querySelectorAll('img,h1,h2,h3,h4,p,button,a,.btn,.nav-link,label,li,.navy-glass-card');
        for(const el of candidates){
            if(this.platforms.length>=240)break;
            if(el.closest?.('.playground-dock,.playground-panel,nav,header,dialog') || el.hidden)continue;
            const bounds=el.getBoundingClientRect();if(bounds.top>window.innerHeight+300 || bounds.bottom<-300 || bounds.width<8 || bounds.height<3)continue;
            if(el.tagName==='IMG' || el.matches?.('.btn,.nav-link')){add(el,bounds);continue;}
            if(document.createRange){const range=document.createRange();try{range.selectNodeContents(el);let line=0;const rows=[];for(const rect of range.getClientRects()){if(rect.width<8 || rect.height<3)continue;const row=rows.find(item=>Math.abs(item.bottom-rect.bottom)<3);if(row){const right=Math.max(row.left+row.width,rect.right);row.left=Math.min(row.left,rect.left);row.width=right-row.left;}else rows.push({left:rect.left,top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height});if(rows.length>=30)break;}for(const row of rows)add(el,row,line++);}finally{range.detach?.();}}
            else add(el,{...bounds,top:bounds.top,bottom:bounds.top+Math.min(20,bounds.height),width:bounds.width,height:Math.min(20,bounds.height)});
        }
        this.platforms.push({x:sx-500,y:sy+window.innerHeight-2,w:window.innerWidth+1000,h:50,isFloor:true,oneWay:true,key:'floor',el:null});
        if(this.destination)this.refreshDestination();
    }

    refreshDestination(){
        const goal=this.destination;if(!goal)return;let best=null,score=100;
        for(const pl of this.platforms){if(pl.isFloor)continue;const horizontal=Math.max(pl.x-goal.x,goal.x-(pl.x+pl.w),0),distance=Math.abs(pl.y-goal.rawY)+horizontal*2;if(horizontal<40 && distance<score){best=pl;score=distance;}}
        if(!best){best=this.platforms.filter(pl=>pl.y>=goal.rawY && goal.x>=pl.x && goal.x<=pl.x+pl.w).sort((a,b)=>a.y-b.y)[0] || null;}
        goal.platform=best;goal.y=best ? best.y-12 : goal.rawY;this.mouseX=goal.x;this.mouseY=goal.y;
    }

    setDestination(x,y){
        if(this.paused || this.destroyed || this.departed || this.reducedMotion.matches || !Number.isFinite(x+y))return;
        this.destination={x:Math.max(window.scrollX+16,Math.min(window.scrollX+window.innerWidth-16,x)),y,rawY:y,platform:null};this.destinationTicks=0;this.lastTouchTime=Date.now();this.refreshDestination();
        this.players.forEach(p=>{p.brain.waypoint=null;p.brain.timer=0;p.goalTicks=0;p.goalDistance=Infinity;p.stalledTicks=0;p.partyTimer=0;p.ledgeHang=null;p.rope.active=false;p.escapeTargetX=null;if(this.mode==='explore'){p.actionTimer=p.stunTimer=0;p.state=p.grounded ? 'run' : 'fall';}});
    }

    crewTarget(p){
        const goal=this.destination,platform=goal?.platform,count=this.players.length;
        const left=Math.max(window.scrollX+12,platform ? platform.x+12 : window.scrollX+12),right=Math.min(window.scrollX+window.innerWidth-12,platform ? platform.x+platform.w-12 : window.scrollX+window.innerWidth-12);
        const step=Math.min(26,Math.max(0,right-left)/Math.max(1,count-1)),half=step*(count-1)/2;
        const center=Math.max(left+half,Math.min(right-half,goal ? goal.x : this.mouseX));
        return {x:center+(p.id-(count-1)/2)*step,y:goal ? goal.y : this.mouseY};
    }

    applyDOMImpact(el, vx, vy) {
        if (!el || el.tagName==='IMG' || el.closest?.('.team-card,.profile-header,nav,form,.playground-dock')) return;
        const r=el.getBoundingClientRect?.();
        if(r)this.spawnShatter(r.left+window.scrollX+r.width/2,r.top+window.scrollY,Math.sign(vx),-1);
    }

    hideHandles() { this.handles.forEach(handle=>handle.hidden=true); }

    configure(state) {
        this.paused=state.paused===true;this.mode=state.mode==='arena' ? 'arena' : 'explore';this.quality=state.quality==='eco' ? 'eco' : 'auto';
        this.grabEnabled=state.grab===true;this.talkEnabled=state.talk!==false;
        this.pace={calm:0.65,normal:1,lively:1.35}[state.pace] || 1;
        if(!this.talkEnabled)this.speechBubbles.length=0;
        const count=['3','6','9'].includes(String(state.count)) ? Number(state.count) : this.players.length;
        if(count!==this.players.length) {
            this.endDrag();this.removeHandles();this.bullets.length=0;this.decals.length=0;this.speechBubbles.length=0;
            while(this.players.length<count)this.players.push(new Stickman(this.players.length,'#36f9c9'));
            this.players.length=count;
        }
        const colors={teal:['#36f9c9','#ab85ed','#ffca66'],violet:['#ab85ed','#66cfff','#ff83bb'],amber:['#ffca66','#36f9c9','#ff8f76']}[state.palette] || ['#36f9c9','#ab85ed','#ffca66'];
        this.players.forEach((player,i)=>player.color=colors[i%colors.length]);
        if(this.mode!=='arena') { this.bullets.length=0;this.decals.length=0;this.players.forEach(player=>{player.hp=CFG.maxHp;player.laydownTimer=0;player.stunTimer=0;player.actionTimer=0;if(['gun','kick','punch','hammer','laydown'].includes(player.state))player.state='idle';}); }
        if(this.grabEnabled && !this.handles.length) this.createHandles();
        this.stop();this.hideHandles();
        if(this.paused)this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.resume();
    }

    removeHandles() {
        const handles=new Set(this.handles);
        this.listeners=this.listeners.filter(([target,type,listener,options])=>{
            if(!handles.has(target))return true;
            target.removeEventListener?.(type,listener,options);return false;
        });
        this.handles.forEach(handle=>handle.remove());this.handles=[];
    }

    createHandles() {
        const names=['Nova','Pixel','Cipher','Echo','Glitch','Vector','Byte','Orbit','Flux'];
        this.players.forEach((player,i)=>{
            const handle=document.createElement('button');handle.type='button';handle.className='stickman-grab';handle.hidden=true;
            handle.setAttribute('aria-label','Drag '+names[i]+'. Press Enter to make them flip.');
            const down=event=>this.beginDrag(event,player);
            const lost=()=>{if(this.dragTarget===player)this.endDrag();};
            const key=event=>{if(['Enter',' '].includes(event.key)) {event.preventDefault();this.command('flip',i);} };
            handle.addEventListener('pointerdown',down);handle.addEventListener('lostpointercapture',lost);handle.addEventListener('keydown',key);
            this.listeners.push([handle,'pointerdown',down],[handle,'lostpointercapture',lost],[handle,'keydown',key]);
            document.body.appendChild(handle);this.handles.push(handle);
        });
    }

    action(actionName) {
        if (actionName === 'web') {
            this.webUp();
            return;
        }
        this.command(actionName);
    }

    webUp() {
        if (this.destroyed || this.paused) return;
        this.players.forEach((player, i) => {
            player.rope.cd = 0;
            player.rope.active = false;
            player.grounded = false;
            const targetX = window.scrollX + (window.innerWidth * (i + 1)) / 4;
            const targetY = Math.max(window.scrollY + 25, player.y - 280);
            this.fireRope(player, targetX, targetY);
            this.speechBubbles.push(new SpeechBubble(player.x, player.y - 18, '🕸️ Web Up!', player.color));
        });
        this.boundEffects();
    }

    command(action,only) {
        if(this.destroyed || this.departed || this.paused || document.hidden || this.reducedMotion.matches) return;
        if(action==='web') { this.webUp(); return; }
        if(!['summon','flip','wave','orbit','dance','scatter','web'].includes(action)) return;
        if(action==='orbit')return;
        if(action==='summon' || action==='scatter'){this.destination=null;this.destinationTicks=0;}
        this.players.forEach((player,i)=>{
            if(only!==undefined && only!==i)return;
            if(action==='summon' || action==='scatter' || !Number.isFinite(player.x+player.y) || player.y<window.scrollY-50 || player.y>window.scrollY+window.innerHeight) {
                player.x=window.scrollX+20+(window.innerWidth-50)*(i+0.5)/this.players.length;
                player.y=window.scrollY+window.innerHeight-90;player.brain=new NavBrain();player.trail=[];
            }
            player.rope.active=false;player.ledgeHang=null;player.escapeTargetX=null;player.laydownTimer=player.stunTimer=player.groggyTimer=0;player.hp=CFG.maxHp;
            if(action==='dance') {player.partyTimer=240;player.vx=0;player.state='wave';}
            else if(action==='wave') { player.partyTimer=110;player.vx=0;player.state='wave'; }
            else {player.partyTimer=0;player.grounded=false;player.state='ninja_flip';player.vy=-11-(i%3);player.vx=(i-(this.players.length-1)/2)*2;player.actionTimer=0;}
            const bubble=new SpeechBubble(player.x,player.y-18,action==='wave' ? ['Hello!','Your move.','Stay curious.'][i%3] : action==='summon' ? ['Crew online.','Ready to roam.','Here we go.'][i%3] : ['Watch this!','Air time!','Clean landing.'][i%3],player.color);
            this.speechBubbles.push(bubble);
            for(let k=0;k<18;k++) {const angle=k/18*Math.PI*2;this.particles.push(new Particle(player.x,player.y,Math.cos(angle)*3,Math.sin(angle)*3-2,player.color,34));}
        });
        this.boundEffects();
    }

    boundEffects() {
        for(const [name,limit] of Object.entries({particles:this.quality==='eco' ? 128 : 256,bullets:32,decals:24,speechBubbles:Math.min(12,this.players.length+3),items:3})) {
            if(this[name].length>limit)this[name].splice(0,this[name].length-limit);
        }
    }

    destroy() {
        if(this.destroyed)return;
        this.destroyed=true;this.stop();this.layoutObserver?.disconnect();this.contentObserver?.disconnect();
        this.listeners.forEach(([target,type,listener,options])=>target.removeEventListener?.(type,listener,options));
        this.handles.forEach(handle=>handle.remove());this.canvas.remove();
        ['particles','bullets','decals','speechBubbles','items','platforms'].forEach(name=>this[name].length=0);
        if(window.stickmanParkour===this)delete window.stickmanParkour;
    }

    spawnShatter(x, y, dirX, dirY) {
        for(let i=0; i<15; i++) {
            this.particles.push(new Particle(x, y, dirX*(2+Math.random()*6) + (Math.random()-0.5)*4, dirY*(Math.random()*8) + (Math.random()-0.5)*4, '#ff9900', 40));
        }
    }

    spawnSpeech(x, y, color) {
        if(!this.talkEnabled)return;
        const hits = ['POW!','OOF!','BONK!','YEET!','BIFF!','ZAP!','WHAM!','SPLAT!'];
        const text = hits[Math.floor(Math.random() * hits.length)];
        this.speechBubbles.push(new SpeechBubble(x, y - 20, text, color));
    }

    spawnItem() {
        if (this.platforms.length < 2) return;
        const valid = this.platforms.filter(pl => !pl.isFloor && pl.w > 40);
        if (!valid.length) return;
        const pl = valid[Math.floor(Math.random() * valid.length)];
        const ix = pl.x + Math.random() * (pl.w - 14);
        this.items.push(new Item(ix, pl.y - 14));
    }

    resolveCollisions(p) {
        if(p.dropTicks>0)p.dropTicks--; 

        const wasGrounded = p.grounded;
        p.grounded = false; p.onWall = false;
        
        for (const pl of this.platforms) {
                                                                             
            if (pl.el && p.ignorePlatformUuid && pl.el.dataset.uuid === p.ignorePlatformUuid) continue;

            if(pl.oneWay){
                if(p.dropTicks>0 && p.dropKey===pl.key)continue;
                const feet=p.y+p.h;
                if(p.vy>=0 && p.x+p.w>pl.x && p.x<pl.x+pl.w && feet<=pl.y+Math.max(8,p.vy+2) && feet+p.vy>=pl.y-1){
                    const impact=p.vy;p.y=pl.y-p.h;p.vy=0;p.grounded=true;p.onWall=false;p.fallTimer=0;p.coyoteTimer=8;p.doubleJumpUsed=false;
                    if(!wasGrounded && impact>3){p.landingSquash=Math.min(10,impact*.8);p.landingVelocity=impact;for(let d=0;d<Math.min(4,Math.floor(impact*.5));d++)this.particles.push(new Particle(p.x+p.w/2,p.y+p.h,(Math.random()-.5)*3,-Math.random()*2,'rgba(180,180,180,0.7)',18));}
                    if(p.state==='ninja_flip')p.state='run';if(p.rope.active)this.releaseRope(p);
                }
                continue;
            }
            const overX = p.x < pl.x + pl.w && p.x + p.w > pl.x;
            const overY = p.y < pl.y + pl.h && p.y + p.h > pl.y;
            if (!overX || !overY) continue;

            const fromTop = (p.y + p.h) - pl.y;
            const fromBot = (pl.y + pl.h) - p.y;
            const fromLeft = (p.x + p.w) - pl.x;
            const fromRight = (pl.x + pl.w) - p.x;
            const min = Math.min(fromTop, fromBot, fromLeft, fromRight);

            if (min === fromTop && p.vy >= 0) {
                const impactVy = p.vy;                          
                p.y = pl.y - p.h; p.vy = 0; p.grounded = true; p.fallTimer = 0;
                p.coyoteTimer = 8;                                  
                p.doubleJumpUsed = false;                             

                                                              
                if (impactVy > 3 && !wasGrounded) {
                    p.landingSquash = Math.min(10, Math.floor(impactVy * 0.8));
                    p.landingVelocity = impactVy;
                                     
                    const dustCount = Math.floor(impactVy * 0.8);
                    for (let d = 0; d < dustCount; d++) {
                        this.particles.push(new Particle(
                            p.x + p.w/2 + (Math.random()-0.5)*18,
                            p.y + p.h,
                            (Math.random()-0.5)*5, -(Math.random()*2),
                            'rgba(180,180,180,0.7)', 18
                        ));
                    }
                }

                if (p.state === 'ninja_flip') p.state = 'run'; 
                if (pl.isFloor) p.escapeTargetX = null; 
                if (p.rope.active) this.releaseRope(p);
            } 
            else if (min === fromBot && p.vy < 0) {
                p.y = pl.y + pl.h; p.vy = 0; 
                if (p.state === 'ninja_flip') p.state = 'fall'; 
                if (p.rope.active) this.releaseRope(p); 
                
                if (p.escapeTargetX === null && !p.isCrawling) {
                    let distToLeftEdge = Math.abs(p.x - pl.x);
                    let distToRightEdge = Math.abs(p.x - (pl.x + pl.w));
                    p.escapeTargetX = (distToLeftEdge < distToRightEdge) ? pl.x - 20 : pl.x + pl.w + 20;
                }
                
                if (pl.el && Math.abs(p.vy) > 2) this.applyDOMImpact(pl.el, p.vx, -5);
            } 
            else if (min === fromLeft && !p.grounded) {
                if (fromTop < 15 && p.vy > 0) { 
                    p.y = pl.y - p.h; p.vy = 0; p.grounded = true; p.fallTimer = 0;
                } else if (p.state === 'ninja_flip') {
                    p.vx = CFG.wallJumpX; p.vy = CFG.wallJumpY; p.facingRight = true;
                } else {
                    p.x = pl.x - p.w; p.vx = 0; p.onWall = true; p.wallSide = 1;
                    if (p.escapeTargetX !== null) p.escapeTargetX = pl.x + pl.w + 20; 
                    if (pl.el && Math.abs(p.vx) > 4) this.applyDOMImpact(pl.el, p.vx, p.vy);
                }
            } 
            else if (min === fromRight && !p.grounded) {
                if (fromTop < 15 && p.vy > 0) { 
                    p.y = pl.y - p.h; p.vy = 0; p.grounded = true; p.fallTimer = 0;
                } else if (p.state === 'ninja_flip') {
                    p.vx = -CFG.wallJumpX; p.vy = CFG.wallJumpY; p.facingRight = false;
                } else {
                    p.x = pl.x + pl.w; p.vx = 0; p.onWall = true; p.wallSide = -1;
                    if (p.escapeTargetX !== null) p.escapeTargetX = pl.x - 20; 
                    if (pl.el && Math.abs(p.vx) > 4) this.applyDOMImpact(pl.el, p.vx, p.vy);
                }
            }
        }
    }

    fireRope(p, targetX, targetY) {
        if (p.rope.cd > 0 || p.rope.active) return;
        let bestDist = Infinity, ax = targetX, ay = Math.min(p.y - 140, targetY);
        
        this.platforms.forEach(pl => {
            if (pl.isFloor || pl.y > p.y) return;
            const dist = Math.hypot(pl.x + pl.w/2 - targetX, pl.y - targetY);
            if (dist < bestDist && Math.hypot(pl.x - p.x, pl.y - p.y) < 700) {
                bestDist = dist; ax = Math.max(pl.x+6,Math.min(pl.x+pl.w-6,targetX)); ay = pl.y-4;
            }
        });

        p.rope.active = true; p.rope.ax = ax; p.rope.ay = ay;
        p.rope.tipX = p.x + p.w/2; p.rope.tipY = p.y;
        p.rope.prog = 0; p.state = 'rope_climb';
        p.grounded = false;
    }

    releaseRope(p, kick=false) {
        p.rope.active = false; p.rope.cd = 30; 
        p.state = 'ninja_flip'; 
        if (kick) { p.vy = -10; if (p.onWall) p.vx = -p.wallSide * 10; }
    }

    processCombat() {
        if(this.mode!=='arena')return;
        let p1 = this.players[Math.floor((this.frame||0)/30)%this.players.length];
        let p2 = this.players.reduce((nearest,p)=>p===p1 ? nearest : !nearest || Math.hypot(p.x-p1.x,p.y-p1.y)<Math.hypot(nearest.x-p1.x,nearest.y-p1.y) ? p : nearest,null);
        if(!p2)return;

        if (p1.laydownTimer > 0 || p2.laydownTimer > 0 || p1.stunTimer > 0 || p2.stunTimer > 0 || p1.dragged || p2.dragged) return;

        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.hypot(dx, dy);

        if (dist < CFG.shootRange && dist > CFG.attackRange && Math.abs(dy) < 50 && Math.random() < 0.02) {
            let attacker = Math.random() > 0.5 ? p1 : p2;
            if (attacker.actionTimer === 0 && attacker.escapeTargetX === null && attacker.state !== 'sit') {
                attacker.state = 'gun';
                attacker.actionTimer = 20;
                attacker.facingRight = (attacker === p1 ? dx < 0 : dx > 0);
                
                let dir = attacker.facingRight ? 1 : -1;
                this.bullets.push(new Bullet(attacker.x + (dir===1?attacker.w:0), attacker.y + 6, dir, attacker.color, attacker.id));
                for(let i=0; i<4; i++) this.particles.push(new Particle(attacker.x + (dir===1?attacker.w:0), attacker.y + 6, dir*Math.random()*3, (Math.random()-0.5)*2, '#fff', 15));
            }
        }

        if (dist < CFG.attackRange && Math.abs(dy) < 40) {
            let attacker = Math.random() > 0.5 ? p1 : p2;
            let defender = attacker === p1 ? p2 : p1;

                                                                                   
            if (attacker.combatCD > 0) { attacker.combatCD--; return; }
            if (attacker.actionTimer > 0 || attacker.escapeTargetX !== null || attacker.state === 'sit') return;

            let r = Math.random();
            let isAirCombo = !attacker.grounded && !defender.grounded;
            const inAir = !attacker.grounded;
            if (inAir && r < 0.5) {
                attacker.state = 'dropkick';
            } else if (r < 0.25) {
                attacker.state = 'punch';
            } else if (r < 0.45) {
                attacker.state = 'kick';
            } else if (r < 0.65) {
                attacker.state = 'knife';
            } else if (r < 0.8) {
                attacker.state = 'hammer';
            } else {
                attacker.state = 'spin';
                attacker.spinAngle = 0;
            }
            attacker.actionTimer = attacker.state === 'hammer' ? 25 : (attacker.state === 'spin' ? 30 : 15);
            attacker.facingRight = (defender.x > attacker.x);
            
            let dir = attacker.facingRight ? 1 : -1;
            let dmg = attacker.state === 'hammer' ? 40
                    : attacker.state === 'knife'   ? 30
                    : attacker.state === 'kick'    ? CFG.kickDmg
                    : attacker.state === 'dropkick'? CFG.dropkickDmg
                    : attacker.state === 'spin'    ? CFG.spinDmg
                    : 15;
                                                          
            const speedBonus = Math.min(2.5, Math.abs(attacker.vx) * 0.25);
            dmg = Math.floor(dmg * (1 + speedBonus));
            defender.hp -= dmg; 
            
            let impactX = defender.x + defender.w/2; let impactY = defender.y + defender.h/2;
            
                                        
            const kbScale = 1 + Math.abs(attacker.vx) * 0.15;

            if (defender.hp <= 0) {
                defender.state = 'laydown'; 
                defender.laydownTimer = 300; 
                defender.vx = dir * (CFG.knockbackX * 1.2 * kbScale); 
                defender.vy = isAirCombo ? -12 : -8;                     
                defender.escapeTargetX = null; 
                if (defender.rope.active) this.releaseRope(defender);
                
                for(let k=0; k<25; k++) this.particles.push(new Particle(impactX, impactY, dir*(2+Math.random()*10), (Math.random()-0.5)*12, defender.color, 60));
                this.decals.push(new Decal(impactX, impactY + 10, defender.color));
                this.spawnSpeech(impactX, impactY, defender.color);
                attacker.tauntTimer = CFG.tauntTime;
                attacker.state = 'taunt';
            } else {
                                                                                        
                if (isAirCombo) {
                    attacker.vy = -3; attacker.vx *= 0.2;
                }
                defender.vx = dir * (attacker.state==='hammer'? CFG.knockbackX * kbScale : CFG.knockbackX*0.6*kbScale); 
                defender.vy = CFG.knockbackY;
                defender.stunTimer = 20; defender.state = 'hit'; 
                if (defender.rope.active) this.releaseRope(defender);
                
                let pColor = attacker.state === 'knife' ? defender.color : '#fff';
                for(let k=0; k<10; k++) this.particles.push(new Particle(impactX, impactY, dir*(2+Math.random()*6), (Math.random()-0.5)*8, pColor, 30));
                if (Math.random() < 0.5) this.spawnSpeech(impactX, impactY, defender.color);
            }
                                                                         
            attacker.combatCD = 40;
        }
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.x += b.vx;
            
            this.players.forEach(p => {
                if (p.id !== b.ownerId && p.laydownTimer === 0 && Math.abs(b.x - (p.x+p.w/2)) < 15 && Math.abs(b.y - (p.y+p.h/2)) < 20) {
                    b.active = false;
                    p.hp -= 25; 
                    
                    let dir = Math.sign(b.vx);
                    if (p.hp <= 0) {
                        p.state = 'laydown'; p.laydownTimer = 300;
                        p.vx = dir * 12; p.vy = -6; p.escapeTargetX = null;
                        if (p.rope.active) this.releaseRope(p);
                        for(let k=0; k<20; k++) this.particles.push(new Particle(p.x, p.y, dir*(2+Math.random()*8), (Math.random()-0.5)*10, p.color, 50));
                        this.decals.push(new Decal(p.x, p.y+10, p.color));
                    } else {
                        p.vx = dir * 8; p.vy = -4; p.stunTimer = 15; p.state = 'hit';
                        for(let k=0; k<6; k++) this.particles.push(new Particle(p.x, p.y, dir*Math.random()*5, (Math.random()-0.5)*5, p.color, 25));
                    }
                }
            });

            if (!b.active || b.x < window.scrollX || b.x > window.scrollX + window.innerWidth) {
                this.bullets.splice(i, 1);
            }
        }
    }

    updatePlayer(p) {
        if(!Number.isFinite(p.x+p.y+p.vx+p.vy))this.command('summon',p.id);
        p.trail.unshift({x: p.x, y: p.y, frame: p.frame, state: p.state, facingRight: p.facingRight, actionTimer: p.actionTimer});
        if(p.trail.length > 3) p.trail.pop();

        if (p.dragged) { p.frame += 0.3; return; }
        if(p.partyTimer>0) {
            p.partyTimer--;p.frame+=0.2;p.state='wave';p.vx*=0.8;p.vy+=CFG.gravity;
            this.resolveCollisions(p);p.x+=p.vx;p.y+=p.vy;
            if(!p.partyTimer)p.state=p.grounded ? 'idle' : 'fall';
            return;
        }
        if(p.ignoreFrames>0 && --p.ignoreFrames===0)p.ignorePlatformUuid=null;

        if (p.laydownTimer > 0) {
            p.laydownTimer--;
            p.vy += CFG.gravity;
            this.resolveCollisions(p);
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.85; 
            if (p.laydownTimer === 0) {
                p.hp = CFG.maxHp; 
                                                                            
                p.state = 'groggy';
                p.groggyTimer = 60;                            
                p.vy = -5; 
                p.vx = (Math.random()-0.5) * 6;
            }
            return; 
        }

                                 
        if (p.groggyTimer > 0) {
            p.groggyTimer--;
            if (p.groggyTimer <= 0) p.state = p.grounded ? 'idle' : 'fall';
        }

        if (p.stunTimer > 0) p.stunTimer--;
        if (p.actionTimer > 0) p.actionTimer--;
        if (p.rope.cd > 0) p.rope.cd--;
        if (p.combatCD > 0) p.combatCD--;
        if (p.landingSquash > 0) p.landingSquash--;
        if (p.speedBoost > 0) p.speedBoost--;
        if (p.tauntTimer > 0) {
            p.tauntTimer--;
            if (p.tauntTimer <= 0 && p.state === 'taunt') p.state = p.grounded ? 'idle' : 'fall';
        }
        if (p.coyoteTimer > 0 && !p.grounded) p.coyoteTimer--;

                                                                  
        if (p.ledgeHang) {
            p.ledgePullTimer--;
            p.vx = 0; p.vy = 0;
            p.x = p.ledgeHang.x; p.y = p.ledgeHang.y;
            p.state = 'climb';
            if (p.ledgePullTimer <= 0) {
                                    
                p.y = p.ledgeHang.platTop - p.h;
                p.vy = 0; p.vx = p.facingRight ? 2 : -2;
                p.state = 'run';
                p.ledgeHang = null;
            }
            p.frame += 0.3;
            return;
        }

                                        
        if (p.actionTimer > 0 && ['punch', 'hammer', 'knife', 'gun'].includes(p.state) && !p.onWall) {
            if (p.state === 'hammer' && p.actionTimer === 5 && p.targetFloor) {
                if (p.targetFloor.el) {
                    this.applyDOMImpact(p.targetFloor.el, 0, 15);
                    this.spawnShatter(p.x+p.w/2, p.y+p.h, 0, 1);
                    p.ignorePlatformUuid = p.targetFloor.el.dataset.uuid; 
                }
                p.targetFloor = null;
                p.vy = 4;                           
                
                                                                          
                p.ignoreFrames=48;
            }
            p.vx *= 0.5; p.vy += CFG.gravity; this.resolveCollisions(p);
            p.x += p.vx; p.y += p.vy;
            return;
        }

                                                                            
        const target=this.crewTarget(p);
        const baseTargetX=target.x,baseTargetY=target.y;
        if(this.destination){p.goalTicks=(p.goalTicks||0)+1;const distance=Math.hypot(baseTargetX-p.x-p.w/2,baseTargetY-p.y-p.h/2);if(p.goalTicks%60===0){p.stalledTicks=distance>35 && (p.goalDistance??Infinity)-distance<8 ? (p.stalledTicks||0)+60 : 0;p.goalDistance=distance;if(p.stalledTicks>=120 && !p.rope.active){if(baseTargetY<p.y-40)this.fireRope(p,baseTargetX,baseTargetY);else if(baseTargetY>p.y+40){const support=this.platforms.find(pl=>Math.abs(p.y+p.h-pl.y)<8 && p.x+p.w>pl.x && p.x<pl.x+pl.w);if(support && !support.isFloor){p.dropKey=support.key;p.dropTicks=24;p.grounded=false;p.vy=3;}}p.stalledTicks=0;}}}

                                                                           
        if (p.stunTimer > 0) {
            p.vy += CFG.gravity; this.resolveCollisions(p);
            p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.frame += 0.3;
            return;
        }

                                                                           
        if (p.rope.active) {
            p.state = 'rope_climb';
            if (p.rope.prog < 1) {
                p.rope.prog += 0.2;
                p.rope.tipX = p.x + (p.rope.ax - p.x) * p.rope.prog;
                p.rope.tipY = p.y + (p.rope.ay - p.y) * p.rope.prog;
            } else {
                const rx = p.rope.ax - (p.x + p.w / 2);
                const ry = p.rope.ay - (p.y + p.h / 2);
                const ang = Math.atan2(ry, rx);
                p.vx = Math.cos(ang) * 14.0;
                p.vy = Math.sin(ang) * 14.0;
                if (Math.hypot(rx, ry) < 30 || p.grounded) this.releaseRope(p, true);
            }
            this.resolveCollisions(p);
            if (p.onWall) this.releaseRope(p, true);
            p.x += p.vx; p.y += p.vy; p.frame += 0.4;
            return;
        }

                                                                           
        const nav = p.brain.compute(p, baseTargetX, baseTargetY, this.platforms);

                                                
                                                                    
        const wpX = nav.x;
        const wpY = nav.y;
        const dx  = wpX - (p.x + p.w / 2);
        const dy  = wpY - (p.y + p.h / 2);

                                                                           
        const rawDx = baseTargetX - (p.x + p.w / 2);
        const rawDy = baseTargetY - (p.y + p.h / 2);

                                                               
        if (p.stunTimer === 0 && p.actionTimer === 0 &&
            !['dash','glider','ninja_flip','sit'].includes(p.state) && !p.onWall) {
            if (Math.abs(dx) > 8) p.facingRight = dx > 0;
        }

                                                                           
        if (p.grounded) {
            p.fallTimer = 0;

            const spd = p.speedBoost > 0 ? CFG.speed * 1.6 : CFG.speed;

                            
            if (nav.action === 'arrived') {
                p.vx *= 0.6;
                if (Math.abs(p.vx) < 0.5) { p.vx = 0; p.state = 'sit'; }
                else p.state = 'run';
                p.facingRight = rawDx > 0;

                                                       
            } else if (nav.action === 'drop') {
                const edgeDx = wpX - (p.x + p.w / 2);
                const atEdge = Math.abs(edgeDx) < 12;
                                                                             
                const atViewBound = (p.x <= window.scrollX + 8 || p.x >= window.scrollX + window.innerWidth - p.w - 8);
                if (!atEdge && !atViewBound) {
                    p.vx = Math.sign(edgeDx) * spd;
                    p.state = 'run';
                } else {
                                                                             
                    const stepDir = atViewBound ? Math.sign(rawDx) : Math.sign(edgeDx || rawDx);
                    p.vx = stepDir * 3;
                    const support=this.platforms.find(pl=>!pl.isFloor && Math.abs(p.y+p.h-pl.y)<8 && p.x+p.w>pl.x && p.x<pl.x+pl.w);if(support){p.dropKey=support.key;p.dropTicks=24;}p.vy=Math.max(3,p.vy);
                    p.grounded = false;
                    p.state = 'fall';
                                                                                         
                    p.brain.waypoint = null;
                    p.brain.timer = 0;
                }

                                                  
            } else if (nav.action === 'jump') {
                if (Math.abs(dx) > 20) {
                    p.vx = Math.sign(dx) * spd;
                    p.state = 'run';
                } else {
                    p.vx *= 0.6;
                    p.state = Math.abs(p.vx) > 1 ? 'run' : 'idle';
                }
                                                        
                if (nav.jumpNeeded && Math.abs(dx) < 80) {
                    p.vy = CFG.jump;
                    p.grounded = false;
                    p.state = 'ninja_flip';
                    p.coyoteTimer = 0;
                }

                                             
            } else {
                if (Math.abs(dx) > 14) {
                    p.vx = Math.sign(dx) * spd;
                    p.state = spd > CFG.speed ? 'dash' : 'run';
                } else {
                    p.vx *= 0.55;
                    p.state = Math.abs(p.vx) > 1 ? 'run' : 'idle';
                }

                                                       
                const isBlocked = Math.abs(dx) > 30 && Math.abs(p.vx) < 1.2;
                if (rawDy < -55 || isBlocked) {
                    if (p.grounded || p.coyoteTimer > 0) {
                        p.vy = CFG.jump;
                        p.grounded = false;
                        p.state = 'ninja_flip';
                        p.coyoteTimer = 0;
                    }
                }

                                                                                 
                const myPl2 = this.platforms.find(pl =>
                    Math.abs((p.y + p.h) - pl.y) < 5 &&
                    p.x + p.w > pl.x && p.x < pl.x + pl.w
                );
                if (rawDy > 50 && Math.abs(rawDx) < 40 && myPl2 && !myPl2.isFloor && p.actionTimer === 0) {
                    if (Math.random() < 0.4 && myPl2.el) {
                        p.state = this.mode==='arena' ? 'hammer' : 'ninja_flip'; p.actionTimer = 25; p.targetFloor = myPl2; p.vx = 0;
                    } else {
                        const dL = Math.abs(p.x - myPl2.x);
                        const dR = Math.abs(p.x - (myPl2.x + myPl2.w));
                                                                
                        const dropX = Math.abs(myPl2.x - baseTargetX) < Math.abs((myPl2.x + myPl2.w) - baseTargetX)
                            ? myPl2.x - 12 : myPl2.x + myPl2.w + 12;
                        p.brain.waypoint = { x: dropX, y: myPl2.y, action: 'drop', jumpNeeded: false };
                    }
                }

                            
                if (Math.abs(rawDx) > 300 && Math.abs(rawDy) < 80 && Math.random() < 0.012) {
                    p.state = 'dash'; p.actionTimer = 15; p.vx = Math.sign(rawDx) * 22;
                }
            }

                                                                            
        } else if (p.onWall) {
            p.facingRight = (p.wallSide === 1);
            p.vx = 0; p.fallTimer = 0;
            if (Math.sign(rawDx) === -p.wallSide) {
                                                      
                p.vy = CFG.wallJumpY; p.vx = -p.wallSide * CFG.wallJumpX;
                p.onWall = false; p.state = 'ninja_flip';
            } else if (rawDy < 0) {
                p.state = 'wall_run'; p.vy = -7.5; p.frame += 0.5;
                if (Math.random() < 0.05) {
                    p.vy = CFG.wallJumpY; p.vx = -p.wallSide * CFG.wallJumpX;
                    p.onWall = false; p.state = 'ninja_flip';
                }
            } else {
                p.state = 'wallslide'; p.vy = Math.min(p.vy + CFG.gravity * 0.2, 5);
            }

                                                                            
        } else {
            p.vy += CFG.gravity;

                                                                
            const airSpd = p.speedBoost > 0 ? CFG.speed * 1.5 : CFG.speed;
            if (Math.abs(dx) < 20) {
                p.vx *= 0.88;                         
            } else {
                p.vx += (Math.sign(dx) * airSpd - p.vx) * 0.15;
            }

            if (p.vy > 0) p.fallTimer++;
            if (p.coyoteTimer > 0) p.coyoteTimer--;

                                                                   
            if (p.fallTimer > 40 && rawDy < -160) {
                p.state = 'glider';
                p.vy = Math.min(p.vy, 2.5);
                p.vx += Math.sin(p.frame) * 1.0;
            } else {
                if (p.state !== 'ninja_flip') p.state = p.vy < 0 ? 'jump' : 'fall';
            }

                                                        
            if (p.vy > 4 && rawDy < -100 && Math.random() < 0.05 && p.state !== 'glider') {
                this.fireRope(p, this.mouseX, this.mouseY);
            }

                                                                  
            if (!p.doubleJumpUsed && p.vy > 0 && rawDy < -70 && Math.random() < 0.04) {
                p.vy = CFG.doubleJumpVy;
                p.doubleJumpUsed = true;
                p.state = 'ninja_flip';
                for (let k = 0; k < 8; k++)
                    this.particles.push(new Particle(p.x + p.w/2, p.y + p.h, (Math.random()-0.5)*5, Math.random()*4, p.color, 20));
            }

                         
            if (p.vy < 0 && !p.ledgeHang && !p.rope.active) {
                for (const pl of this.platforms) {
                    if (pl.isFloor) continue;
                    const nearTop = Math.abs(p.y - pl.y) < 18 && p.y > pl.y - 5;
                    if (!nearTop) continue;
                    if (Math.abs((p.x + p.w) - pl.x) < 10) {
                        p.ledgeHang = { x: pl.x - p.w, y: pl.y - p.h + 6, platTop: pl.y };
                        p.ledgePullTimer = 22; p.facingRight = true; break;
                    } else if (Math.abs(p.x - (pl.x + pl.w)) < 10) {
                        p.ledgeHang = { x: pl.x + pl.w, y: pl.y - p.h + 6, platTop: pl.y };
                        p.ledgePullTimer = 22; p.facingRight = false; break;
                    }
                }
            }
        }

        this.resolveCollisions(p); 
        p.x += p.vx; p.y += p.vy; 
        
                      
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.collected) continue;
            if (Math.abs(p.x - item.x) < 20 && Math.abs(p.y - item.y) < 20) {
                item.collected = true;
                this.items.splice(i, 1);
                if (item.type === 'hp') {
                    p.hp = Math.min(CFG.maxHp, p.hp + 40);
                    for (let k = 0; k < 10; k++) this.particles.push(new Particle(p.x + p.w/2, p.y, (Math.random()-0.5)*4, -Math.random()*3, '#00ff88', 30));
                    this.speechBubbles.push(new SpeechBubble(p.x + p.w/2, p.y - 10, '+HP', '#00ff88'));
                } else {
                    p.speedBoost = 180;
                    for (let k = 0; k < 10; k++) this.particles.push(new Particle(p.x + p.w/2, p.y, (Math.random()-0.5)*4, -Math.random()*3, '#ffcc00', 30));
                    this.speechBubbles.push(new SpeechBubble(p.x + p.w/2, p.y - 10, 'FAST!', '#ffcc00'));
                }
            }
        }

        if (p.x < window.scrollX + 5) {
            p.x = window.scrollX + 5; p.vx = Math.abs(p.vx);
        }
        if (p.x > window.scrollX + window.innerWidth - p.w - 5) {
            p.x = window.scrollX + window.innerWidth - p.w - 5; p.vx = -Math.abs(p.vx);
        }

        if (p.y > window.scrollY + window.innerHeight + 100) { 
            p.y = window.scrollY + window.innerHeight - 60; 
            p.x = Math.max(window.scrollX + 10, Math.min(this.mouseX, window.scrollX + window.innerWidth - 10)); 
            p.vy = -15; 
        }

        if (p.state === 'ninja_flip') p.frame += 0.4;
        else if (p.state === 'groggy') p.frame += 0.18;                                                  
        else if (!['climb', 'wall_run', 'rope_climb', 'laydown', 'sit'].includes(p.state)) p.frame += 0.25;

                                                                            
        if (p.grounded && p.state === 'idle' && p.groggyTimer === 0) {
            p.idleTimer++;
            if (p.idleTimer === 90 && p.idleAction === '') {
                const actions = ['wave', 'scratch', 'look'];
                p.idleAction = actions[Math.floor(Math.random() * actions.length)];
            }
            if (p.idleTimer > 140) { p.idleTimer = 0; p.idleAction = ''; }
        } else {
            p.idleTimer = 0; p.idleAction = '';
        }
    }

    update() {
        this.boundEffects();
                                                                                             
        const timeSinceTouch = Date.now() - this.lastTouchTime;
        if(this.destination && ++this.destinationTicks>1800)this.destination=null;
        const isMobileIdle = timeSinceTouch > 3000 && !this.touchActive && !this.destination;
        if (isMobileIdle) {
            this.wanderTimer = (this.wanderTimer || 0) + 1;
                                                                                      
            const cx = window.scrollX + window.innerWidth / 2 + Math.sin(this.wanderTimer * 0.012) * (window.innerWidth * 0.3);
            const cy = window.scrollY + window.innerHeight * 0.55;
            this.mouseX += (cx - this.mouseX) * 0.02;
            this.mouseY += (cy - this.mouseY) * 0.02;
        } else {
            this.wanderTimer = 0;
        }

        this.processCombat();
        this.updateBullets();
        this.players.forEach(p => this.updatePlayer(p));

                                                                                         
        this.players.forEach(player=>player.isReviving=false);
        const reviveHelper = (helper, downed) => {
            if (downed.laydownTimer <= 150 || helper.laydownTimer > 0 || helper.groggyTimer > 0 || helper.dragged) {
                helper.isReviving = false; return;
            }
            const reviveDist = Math.hypot(downed.x - helper.x, downed.y - helper.y);
            if (reviveDist < 38) {
                                                                   
                downed.laydownTimer = Math.max(0, downed.laydownTimer - 2);
                helper.isReviving = true;
                helper.state = 'idle';
                helper.vx *= 0.5;                  
                                                             
                if (Math.random() < 0.06) {
                    this.particles.push(new Particle(
                        downed.x + downed.w/2 + (Math.random()-0.5)*16,
                        downed.y + (Math.random()-0.5)*10,
                        (Math.random()-0.5)*1.5, -1.2,
                        '#00ff88', 28
                    ));
                }
            } else {
                                                                                    
                helper.isReviving = true;
                if (helper.grounded && helper.actionTimer === 0 && helper.stunTimer === 0) {
                    const runDir = downed.x > helper.x ? 1 : -1;
                    helper.vx = runDir * CFG.speed * 1.1;
                    helper.facingRight = runDir > 0;
                    helper.state = 'run';
                    if (reviveDist > 80 && Math.random() < 0.02 && downed.y < helper.y - 20) {
                        helper.vy = CFG.jump; helper.grounded = false; helper.state = 'ninja_flip';
                    }
                }
            }
        };
        this.players.filter(player=>player.laydownTimer>150).forEach(downed=>{
            const helper=this.players.find(player=>player!==downed && player.laydownTimer<=0 && !player.dragged && !player.isReviving);
            if(helper)reviveHelper(helper,downed);
        });

                         
        for (let i = this.speechBubbles.length - 1; i >= 0; i--) {
            const sb = this.speechBubbles[i];
            sb.y += sb.vy;
            sb.life--;
            if (sb.life <= 0) this.speechBubbles.splice(i, 1);
        }

                     
        if(this.talkEnabled && --this.talkTimer<=0) {
            const player=this.players[Math.floor(Math.random()*this.players.length)];
            const lines=['Privacy matters.','Nice orbit.','Stay curious.','Got your back.','Time for a flip?','Hello, explorer.','Tiny crew. Big ideas.','Mind the landing.'];
            this.speechBubbles.push(new SpeechBubble(player.x+player.w/2,player.y-12,lines[Math.floor(Math.random()*lines.length)],player.color));
            this.talkTimer=360+Math.floor(Math.random()*360);
        }
        this.itemSpawnTimer++;
        if (this.itemSpawnTimer > 420 && this.items.length < 3) {
            this.spawnItem();
            this.itemSpawnTimer = 0;
        }
        this.frame = (this.frame || 0) + 1;

        for(let i = this.particles.length-1; i>=0; i--) {
            let pt = this.particles[i];
            pt.x += pt.vx; pt.y += pt.vy; pt.vy += CFG.gravity * 0.5; pt.life--;
            if (pt.life <= 0) this.particles.splice(i, 1);
        }
        this.boundEffects();
        for(let i = this.decals.length-1; i>=0; i--) {
            this.decals[i].life--; if (this.decals[i].life <= 0) this.decals.splice(i, 1);
        }
    }

    renderSkeleton(ctx, state, frame, actionTimer) {
        let hx=0, hy=-16, b0y=-10, b1y=5, lax=-12, lay=-3, rax=12, ray=-3, llx=-9, lly=20, rlx=9, rly=20;
        let lkx=null, lky=null, rkx=null, rky=null; 
        let lex=null, ley=null, rex=null, rey=null; 

        switch(state) {
            case 'run':
            case 'dash': 
                let spd = state === 'dash' ? 2 : 1;
                lax=-13+Math.sin(frame*spd)*13; lay=-6+Math.abs(Math.sin(frame*spd))*3;
                rax= 13-Math.sin(frame*spd)*13; ray=-6+Math.abs(Math.sin(frame*spd))*3;
                llx=-10+Math.cos(frame*spd)*12; lly=20-Math.abs(Math.cos(frame*spd))*6;
                rlx= 10-Math.cos(frame*spd)*12; rly=20-Math.abs(Math.cos(frame*spd))*6;
                if (state==='dash') { hx=6; b0y=-5; } 
                break;
            case 'wall_run': 
                let wt = frame * 2.0;
                hx = 8; hy = -12; b0y = -6; b1y = 6;
                lax = 4 + Math.sin(wt)*6; lay = -4 + Math.cos(wt)*6;
                rax = 4 - Math.sin(wt)*6; ray = -4 - Math.cos(wt)*6;
                llx = 0 + Math.cos(wt)*8; lly = 12 + Math.sin(wt)*8;
                rlx = 0 - Math.cos(wt)*8; rly = 12 - Math.sin(wt)*8;
                break;
            case 'ninja_flip': 
                hx = 0; hy = 6; b0y = 2; b1y = -6; 
                lax = -8; lay = 0; rax = 8; ray = 0; 
                llx = -6; lly = -10; rlx = 6; rly = -10; 
                break;
            case 'climb': 
                lax = 10; lay = -15 + Math.sin(frame * 1.5) * 10;
                rax = 10; ray = -15 + Math.cos(frame * 1.5) * 10;
                llx = 6;  lly = 15 + Math.cos(frame * 1.5) * 8;
                rlx = 6;  rly = 15 + Math.sin(frame * 1.5) * 8;
                hx = 4; hy = -14; b0y = -8; 
                break;
            case 'rope_climb': 
                lax = -2; lay = -22 + Math.sin(frame * 2) * 6;
                rax = 2;  ray = -22 + Math.cos(frame * 2) * 6;
                llx = -4; lly = 18 + Math.cos(frame * 2) * 4;
                rlx = 4;  rly = 18 + Math.sin(frame * 2) * 4;
                hx = 0; hy = -18;
                break;
            case 'glider':
                hx = 0; hy = 2; b0y = 6; b1y = 14;
                lax = -15; lay = -10; rax = 15; ray = -10;
                llx = -4; lly = 18; rlx = 4; rly = 18;
                break;
            case 'sit':                                                        
                hx = 0; hy = -14;                         
                b0y = -8; b1y = 4;                          
                                                      
                lkx = -14; lky = 4;                             
                rkx = 14;  rky = 4;                               
                llx = -10; lly = 14;                        
                rlx = 10;  rly = 14;                         
                                             
                lex = -8; ley = -2;                     
                rex = 8;  rey = -2;                      
                lax = -13; lay = 8;                                 
                rax = 13;  ray = 8;                                   
                break;
            case 'jump': lax=-16; lay=-14; rax=16; ray=-14; llx=-5; lly=15; rlx=5; rly=22; break;
            case 'fall': lax=-18; lay=0; rax=18; ray=0; llx=-8; lly=18; rlx=10; rly=24; hy=-18; break;
            case 'wallslide': lax=14; lay=-16; rax=5; ray=3; llx=-4; lly=20; rlx=7; rly=24; break;
            case 'punch': lax=18; lay=-10; rax=-10; ray=0; llx=-12; lly=20; rlx=15; rly=20; hx=4; break; 
            case 'knife': 
                lax=20; lay=-5; rax=-10; ray=0; llx=-12; lly=20; rlx=15; rly=20; hx=4; 
                ctx.save(); ctx.beginPath(); ctx.moveTo(lax, lay); ctx.lineTo(lax+12, lay); ctx.strokeStyle='#ccc'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();
                break;
            case 'gun': 
                lax=18; lay=-10; rax=-10; ray=0; llx=-12; lly=20; rlx=15; rly=20; hx=4; 
                ctx.save(); ctx.beginPath(); ctx.moveTo(lax, lay); ctx.lineTo(lax+10, lay); ctx.lineTo(lax+10, lay+4); ctx.strokeStyle='#fff'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
                break;
            case 'hammer': 
                lax=10; lay=-10; rax=10; ray=-10; 
                if (actionTimer < 10) { lax=15; lay=5; rax=15; ray=5; } 
                llx=-12; lly=20; rlx=15; rly=20; hx=4;
                ctx.save(); ctx.translate(lax, lay);
                ctx.rotate(actionTimer < 10 ? Math.PI/2 : -Math.PI/4); 
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0, -25); ctx.stroke(); 
                ctx.fillStyle = '#888'; ctx.shadowBlur = 0;
                ctx.fillRect(-8, -32, 16, 18); 
                ctx.restore();
                break;
            case 'kick':
                lax = -10; lay = -3; rax = -8; ray = -3;
                llx = -8; lly = 15; rlx = 18; rly = 5;                    
                hx = 2; break;
            case 'dropkick':
                hx = 0; hy = 0; b0y = 4; b1y = 12;
                lax = -14; lay = -8; rax = 14; ray = -8;
                llx = -12; lly = 8; rlx = 18; rly = 8; break;
            case 'spin':
                hx = 0; hy = -16;
                lax = -18 + Math.sin(frame * 6) * 6; lay = -6;
                rax = 18 - Math.sin(frame * 6) * 6; ray = -6;
                llx = -14 + Math.cos(frame * 6) * 6; lly = 20;
                rlx = 14 - Math.cos(frame * 6) * 6; rly = 20;
                break;
            case 'taunt':
                                                                         
                hx = Math.sin(frame * 2) * 2; hy = -16;
                lax = 4 + Math.sin(frame * 3) * 2; lay = -20 + Math.abs(Math.sin(frame * 3)) * 3;
                rax = -8; ray = -4;
                llx = -8; lly = 20; rlx = 8; rly = 20;
                break;
            case 'hit': lax=-15; lay=-15; rax=15; ray=-15; llx=-15; lly=10; rlx=15; rly=10; hy=-20; b0y=-15; break;
            case 'laydown': 
                hx=15; hy=20; b0y=20; b1y=20; 
                lax=5; lay=24; rax=25; ray=24; 
                llx=-15; lly=22; rlx=-22; rly=18; 
                break;
                                                     
            case 'groggy':
                hx = Math.sin(frame * 3) * 5;
                lax = -10 + Math.sin(frame * 4) * 8; lay = -4;
                rax = 10 - Math.sin(frame * 4) * 8; ray = -4;
                llx = -8 + Math.cos(frame * 3) * 6; lly = 20;
                rlx = 8 - Math.cos(frame * 3) * 6; rly = 20;
                break;
                                      
            case 'wave':
                lax = -5 + Math.sin(frame * 5) * 10; lay = -20 + Math.abs(Math.sin(frame * 5)) * 4;
                rax = 10; ray = -3;
                llx = -6; lly = 20; rlx = 6; rly = 20;
                break;
                                         
            case 'scratch':
                lax = 3 + Math.sin(frame * 8) * 3; lay = -18;
                rax = 12; ray = -3;
                llx = -6; lly = 20; rlx = 6; rly = 20;
                break;
                                                     
            case 'look':
                hx = Math.sin(frame * 0.8) * 6; hy = -16;
                lax = -12; lay = -3; rax = 12; ray = -3;
                llx = -6; lly = 20; rlx = 6; rly = 20;
                break;
            default: b0y=-10+Math.sin(frame*0.3); break; 
        }

        ctx.beginPath(); ctx.arc(hx,hy,6,0,Math.PI*2); ctx.stroke(); 
        ctx.beginPath(); ctx.moveTo(hx,b0y); ctx.lineTo(0,b1y); ctx.stroke(); 
        
        ctx.beginPath(); ctx.moveTo(hx,b0y); 
        if (lex !== null) ctx.lineTo(lex, ley);
        ctx.lineTo(lax,lay); ctx.stroke(); 
        
        ctx.beginPath(); ctx.moveTo(hx,b0y); 
        if (rex !== null) ctx.lineTo(rex, rey);
        ctx.lineTo(rax,ray); ctx.stroke(); 
        
        ctx.beginPath(); ctx.moveTo(0,b1y); 
        if (lkx !== null) ctx.lineTo(lkx, lky);
        ctx.lineTo(llx,lly); ctx.stroke(); 
        
        ctx.beginPath(); ctx.moveTo(0,b1y); 
        if (rkx !== null) ctx.lineTo(rkx, rky);
        ctx.lineTo(rlx,rly); ctx.stroke(); 
    }

    drawStickman(p) {
        const ctx = this.ctx;
        
        if (p.rope.active && p.rope.prog > 0.05) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x + p.w / 2, p.y + 4);
            const endX = p.rope.prog < 1 ? p.rope.tipX : p.rope.ax;
            const endY = p.rope.prog < 1 ? p.rope.tipY : p.rope.ay;
            const midX = (p.x + p.w / 2 + endX) / 2;
            const midY = (p.y + 4 + endY) / 2 + Math.min(24, Math.hypot(endX - p.x, endY - p.y) * 0.12);
            ctx.quadraticCurveTo(midX, midY, endX, endY);
            // Spider-Man web styling: Glowing white silk with cyan aura
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.2;
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 9;
            ctx.stroke();

            // Extra inner silk strand
            ctx.beginPath();
            ctx.moveTo(p.x + p.w / 2, p.y + 2);
            ctx.quadraticCurveTo(midX + 2, midY - 2, endX, endY);
            ctx.strokeStyle = 'rgba(210, 245, 255, 0.8)';
            ctx.lineWidth = 1.0;
            ctx.stroke();

            if (p.rope.prog >= 1) {
                // Web anchor node and spider rosette
                ctx.beginPath();
                ctx.arc(p.rope.ax, p.rope.ay, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 12;
                ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(p.rope.ax - 7, p.rope.ay - 2); ctx.lineTo(p.rope.ax + 7, p.rope.ay + 2);
                ctx.moveTo(p.rope.ax - 4, p.rope.ay + 6); ctx.lineTo(p.rope.ax + 4, p.rope.ay - 6);
                ctx.stroke();
            }
            ctx.restore();
        }

        if (p.state === 'glider') {
            ctx.save();
            ctx.translate(p.x+p.w/2, p.y+p.h/2);
            if (!p.facingRight) ctx.scale(-1,1);
            ctx.scale(0.65, 0.65);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -25); ctx.lineTo(-30, -10); ctx.lineTo(-10, -15);
            ctx.lineTo(0, -10); ctx.lineTo(10, -15); ctx.lineTo(30, -10);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth=2; ctx.stroke();
            ctx.restore();
        }

        p.trail.forEach((tr, i) => {
            ctx.save(); ctx.globalAlpha = (1 - (i / p.trail.length)) * 0.3; 
            ctx.translate(tr.x+p.w/2, tr.y+p.h/2);
            if (!tr.facingRight) ctx.scale(-1,1);
            ctx.scale(0.65, 0.65); 
            if (tr.state === 'ninja_flip') ctx.rotate(tr.frame * 2.5);
            ctx.strokeStyle = p.color; ctx.lineWidth = 3;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            this.renderSkeleton(ctx, tr.state, tr.frame, tr.actionTimer);
            ctx.restore();
        });

        if (p.hp < CFG.maxHp && p.laydownTimer === 0) {
            ctx.fillStyle = '#f00'; ctx.fillRect(p.x - 2, p.y - 12, 12, 2);
            ctx.fillStyle = '#0f0'; ctx.fillRect(p.x - 2, p.y - 12, 12 * (p.hp/CFG.maxHp), 2);
        }

        ctx.save(); ctx.translate(p.x+p.w/2, p.y+p.h/2);
        if (!p.facingRight) ctx.scale(-1,1);
        ctx.scale(0.65, 0.65); 
        
                                                                
        if (p.landingSquash > 0) {
            const squashProgress = p.landingSquash / Math.min(10, p.landingVelocity * 0.8);
            const squashY = 1 - squashProgress * 0.35;                    
            const stretchX = 1 + squashProgress * 0.25;
            ctx.scale(stretchX, squashY);
        }
        
        if (p.state === 'ninja_flip') ctx.rotate(p.frame * 2.5); 
        
        ctx.strokeStyle = (p.stunTimer > 0 && p.stunTimer % 4 < 2) ? '#fff' : p.color;
        const glowColor = p.speedBoost > 0 ? '#ffcc00' : p.color;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = p.speedBoost > 0 ? 20 : ((p.stunTimer > 0 || p.state === 'laydown') ? 0 : 10);
        
        ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                                                                                            
        const drawState = (p.state === 'idle' && p.idleAction) ? p.idleAction : p.state;
        this.renderSkeleton(ctx, drawState, p.frame, p.actionTimer);
        ctx.restore();
    }

    draw() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                                                                                             
        this.ctx.save();
        this.ctx.translate(-window.scrollX, -window.scrollY);

        if(this.destination && this.destinationTicks<120){this.ctx.save();this.ctx.globalAlpha=1-this.destinationTicks/120;this.ctx.strokeStyle='#36f9c9';this.ctx.lineWidth=1.5;this.ctx.beginPath();this.ctx.arc(this.destination.x,this.destination.rawY,10+Math.sin(this.destinationTicks*.12)*2,0,Math.PI*2);this.ctx.stroke();this.ctx.restore();}
        this.decals.forEach(d => d.draw(this.ctx));
        this.items.forEach(item => item.draw(this.ctx, this.frame));
        this.particles.forEach(pt => pt.draw(this.ctx));
        this.bullets.forEach(b => b.draw(this.ctx));
        this.players.forEach(p => this.drawStickman(p));
        this.handles.forEach((handle,i)=>{
            const player=this.players[i];handle.hidden=!this.grabEnabled || this.paused || this.reducedMotion.matches;
            handle.style.transform=`translate3d(${Math.round(player.x-window.scrollX+player.w/2-22)}px,${Math.round(player.y-window.scrollY+player.h/2-22)}px,0)`;
            handle.style.setProperty('--grab-color',player.color);
        });
        this.speechBubbles.forEach(sb => sb.draw(this.ctx));
        this.ctx.restore();
    }

    loop(time) {
        this.rafId = null;
        if (this.destroyed || this.departed || this.paused || document.hidden || this.reducedMotion.matches) return;
        const delta = this.lastFrameTime ? Math.min(time - this.lastFrameTime, 50) : 1000 / 60;
        this.lastFrameTime = time;
        this.accumulator += delta*this.pace;
        const floor = this.platforms.find(platform => platform.isFloor);
        if (floor) { floor.x = window.scrollX - 500; floor.y = window.scrollY + window.innerHeight - 2; }
                                                                                 
        let steps = 0;
        while (this.accumulator >= 1000 / 60 && steps < 3) {
            this.update();
            this.accumulator -= 1000 / 60;
            steps++;
        }
        if (steps === 3) this.accumulator = 0;
        const interval=this.quality==='eco' || this.compact ? 1000/30 : 1000/60;
        if(steps>0 && time-this.lastDrawTime>=interval-0.5) {this.draw();this.lastDrawTime=time;}
        this.rafId = requestAnimationFrame(this.boundLoop);
    }
}

window.initStickmanParkour = function() {
    if (!window.stickmanParkour) {
        window.stickmanParkour = new StickmanParkour();
    }
    return window.stickmanParkour;
};

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => { window.initStickmanParkour(); }, 300);
        });
    } else {
        setTimeout(() => { window.initStickmanParkour(); }, 150);
    }
}
