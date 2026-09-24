/* AJO shared core: mock data, store (localStorage), toast, shell. Swap load()/save() for API calls later. */
const K='ajo_v1',$=(s,e=document)=>e.querySelector(s),fmt=n=>'₦'+Number(n).toLocaleString('en-NG');
const NAMES=['David Oluwatobi','John Doe','Sarah Bello','Michael Eze','Peter Okafor','Amina Yusuf','Chinedu Obi','Funke Adeyemi','Ibrahim Musa','Ngozi Nwosu'];
const seed=()=>({user:null,
 team:{name:'Friends Monthly Ajo',amt:20000,cycle:'September 2026',code:'ABX72K',bank:{bank:'GTBank',name:'Adebayo Ogunleye',no:'0123456789'}},
 pay:NAMES.map((m,i)=>({id:i,m,amt:20000,ref:'TRX'+(88400+i),date:'2026-09-'+(10+i),st:i<8?'ok':'wait'})),
 disb:[{to:'David Oluwatobi',mon:'August 2026',amt:200000,ref:'TRX118',cur:false}],
 order:[['August 2026','David Oluwatobi','done'],['September 2026','John Doe','now'],['October 2026','Sarah Bello',''],['November 2026','Michael Eze',''],['December 2026','Peter Okafor','']]});
let S=JSON.parse(localStorage.getItem(K)||'null')||seed();
const save=()=>localStorage.setItem(K,JSON.stringify(S));
const sum=(a,f=x=>x)=>a.reduce((t,x)=>t+f(x),0);
const confirmed=()=>sum(S.pay.filter(p=>p.st==='ok'),p=>p.amt);
const balance=()=>confirmed()-sum(S.disb.filter(d=>d.cur),d=>d.amt); // Ajo Balance = confirmed − recorded disbursements
const badge=s=>({ok:'<span class="badge b-ok">Confirmed</span>',wait:'<span class="badge b-wait">Pending</span>',bad:'<span class="badge b-bad">Rejected</span>'}[s]);
const initials=n=>n.split(' ').map(w=>w[0]).slice(0,2).join('');
function toast(msg,err){let t=$('#toasts')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'toasts'}));
 const e=Object.assign(document.createElement('div'),{className:'toast'+(err?' err':''),textContent:msg,role:'status'});t.append(e);setTimeout(()=>e.remove(),3200)}
const modal=(id,open=true)=>$('#'+id).classList.toggle('open',open);
function logout(){S.user=null;save();location.href=location.pathname.match(/admin|member/)?'../login.html':'login.html'}
function shell(role,items){
 if(!S.user||S.user.role!==role){location.href='../login.html';return}
 const v=$('#view'),app=document.createElement('div');app.className='app '+role;
 app.innerHTML=`<nav class="side" aria-label="Main"><div class="logo"><i class="fa-solid fa-people-group"></i>AJO</div>
 ${items.map((x,i)=>`<a href="#${x[0]}" class="${i?'':'on'}"><i class="fa-solid ${x[2]}"></i>${x[1]}</a>`).join('')}<div class="sp"></div>
 <a href="#" id="out"><i class="fa-solid fa-right-from-bracket"></i>Logout</a></nav><main class="main"></main>`;
 v.replaceWith(app);$('.main',app).append(v);$('#out').onclick=e=>{e.preventDefault();logout()};
 addEventListener('hashchange',()=>document.querySelectorAll('.side a').forEach(a=>a.classList.toggle('on',a.hash===location.hash)));
}
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register((location.pathname.match(/admin|member/)?'../':'')+'service-worker.js').catch(()=>{}));
