let time = 1500, interval = null, isRunning = false;
let tasks = JSON.parse(localStorage.getItem('gate_tasks') || '[]');

function updateTimer(){
  let m=Math.floor(time/60), s=time%60;
  document.getElementById('timer').innerText=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function startTimer(){
  if(isRunning) return;
  isRunning=true;
  interval=setInterval(()=>{
    time--; updateTimer();
    if(time<=0){ clearInterval(interval); isRunning=false; alert('Pomodoro Done! 5 min break lo'); time=1500; updateTimer(); }
  },1000);
}
function pauseTimer(){ clearInterval(interval); isRunning=false; }
function resetTimer(){ pauseTimer(); time=1500; updateTimer(); }

function renderTasks(){
  let list=document.getElementById('taskList'); list.innerHTML='';
  tasks.forEach((t,i)=>{
    let li=document.createElement('li'); li.innerText=t.text;
    if(t.done) li.classList.add('done');
    li.onclick=()=>{ tasks[i].done=!tasks[i].done; save(); }
    let del=document.createElement('span'); del.innerText=' ✕'; del.style.color='#ff5555';
    del.onclick=(e)=>{ e.stopPropagation(); tasks.splice(i,1); save(); }
    li.appendChild(del); list.appendChild(li);
  });
  let done=tasks.filter(t=>t.done).length;
  document.getElementById('progressText').innerText=`${done} / ${tasks.length} Done`;
  document.getElementById('progressBar').style.width= tasks.length? `${(done/tasks.length)*100}%` : '0%';
}
function addTask(){
  let inp=document.getElementById('taskInput'); if(!inp.value.trim()) return;
  tasks.push({text:inp.value, done:false}); inp.value=''; save();
}
function save(){ localStorage.setItem('gate_tasks',JSON.stringify(tasks)); renderTasks(); }

renderTasks(); updateTimer();
document.getElementById('taskInput').addEventListener('keypress',(e)=>{ if(e.key==='Enter') addTask(); });