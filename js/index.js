 
   function render(){
	var content=document.querySelector('.content')
	var start=document.querySelector('.zong')
	var over=document.querySelector('.finish')
	var todocount=document.querySelector('.shu')
	var donecount=document.querySelector('.shu1')
	var data=getData()
	var todostring=""
	var donestring=""
	var todoCount=0;
	var doneCount=0;
	for (var i =0; i <data.length; i++) {
		if (data[i].done=='true') {
		    donestring+='<div class="content"><span class="color">完</span><input type="checkbox" onchange=change('+i+',"done","false") checked><span class="font" contenteditable="true" onblur=edit('+i+')>'+data[i].title+'</span><div class="del"><a href="javascript:remove('+i+')">-</a></div></div>' 
		        doneCount++; 
	    }else{
	    	todostring+='<div class="content"><span class="color">作</span><input type="checkbox" onchange=change('+i+',"done","true")><span class="font" contenteditable="true" onblur=edit('+i+')>'+data[i].title+'</span><div class="del"><a href="javascript:remove('+i+')">-</a></div></div>'
	    	    todoCount++;
			 }
		  }
		   start.innerHTML=todostring;
		   over.innerHTML=donestring;
		   donecount.innerHTML=doneCount;
		   todocount.innerHTML=todoCount;	
	}	   

	render()
function edit(i){
	
	var data=document.querySelectorAll('.font')
	if (data[i].textContent.length==0) {
		alert("内容不能为空")
		render();
	}else{
		change(i,"title",data[i].textContent)
		render();
	}
  }

function remove(i){
	var data=getData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	render();
}

 function clear(){
	localStorage.clear();
	render();
}
   var inputbtn=document.querySelector('.top input')
   inputbtn.onkeydown=function(e){
     if (e.keyCode==13) {
     	if (this.value=='') {
     		return;
     	}else{
     	var title=this.value;	
        var data=getData();
		var todo={"title":title,"done":false};
		data.push(todo);
		saveData(data);
		this.value=''
		render();
     	}
     };
   }
   function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));
  }
   function getData(){
	var d=localStorage.getItem("todo");
	if(d!=null){
		return JSON.parse(d);
	}else return [];
  }
  function change(i,key,val){
     var data=getData();
     data[i][key]=val;
     saveData(data);
     render();
  } 