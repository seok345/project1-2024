function xbtnclick(e){
  pnode = e.target.parentNode;
  list = document.getElementById('todolist')
  list.removeChild(pnode)
}
function donebtnclick(e) {
  pnode = e.target.parentNode;
  pnode.classList.toggle('done')
}

function addItem(){
  console.log('addItem 함수 호출됨');

  todo = document.getElementById('item')
  list = document.getElementById('todolist')

  listitem = document.createElement('li')
  listitem.innerText = todo.value
  listitem.className = 'list-group-item list-group-item-action list-group-item-warning';

  xbtn = document.createElement('button')
  xbtn.innerHTML = "&times"
  xbtn.className = 'close'

  // onclick 지원방법1 - 함수 적용
  //xbtn.onclick = xbtnclick;

  // onclick 지원방법2 - 익명함수 적용
  // xbtn.onclick = function(e){
  //     pnode = e.target.parentNode
  //     list.removeChild(pnode)
  // }

  // onclick 지원방법3 - 화살표함수 적용
  xbtn.onclick = (e)=>{
      pnode = e.target.parentNode
      list.removeChild(pnode)
  }
  donebtn = document.createElement('button');
  donebtn.innerText = '다했음';
  donebtn.className = 'btn btn-success ml-2';
  donebtn.onclick = donebtnclick;
  

  listitem.appendChild(xbtn)
  listitem.appendChild(donebtn)

  list.appendChild(listitem)

  todo.value = ""
  todo.focus()
}