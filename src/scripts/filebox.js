function fileboxInit() {
  var fileInput = $('.filebox .upload-hidden');
  fileboxLists = {};
  fileInput.map(function(i, elem) {
    fileboxLists[$(elem).attr('id')] = new fileboxList($(elem).attr('id'), 10*1024*1024);
  })

  fileInput.on('change', function(){  // 값이 변경되면
    var fileTarget = $(this);
    var fileTargetId = $(this).attr('id');
    if(window.FileReader){  // modern browser
      // for (var i=0; i < $(this)[0].files.length; i++) {
      //   var file = $(this)[0].files[i];
      // }
      var files = $(this)[0].files;
    } 
    else {  // old IE
      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
    }
    
    // console.log(fileboxLists[fileTargetId])
    fileboxLists[fileTargetId].concat(files);  

    // 렌더할 위치
    var renderTarget = $('.filebox-list').filter(function() {
      // console.log($(this).data('fileboxId'), $(fileTarget), $(fileTarget).attr('id'))
      return $(this).data('fileboxId') === fileTargetId;
    })
    
    // 파일리스트 render
    // console.log(nameTarget, fileboxLists, fileboxLists[fileTargetId].render());
    renderFilelist(renderTarget, fileboxLists, fileTargetId);
    
  });
}

function renderFilelist (renderTarget, fileboxLists, fileTargetId) {
  $(renderTarget).html(fileboxLists[fileTargetId].render());

  // delete 이벤트 추가
  var $items = $(renderTarget).find('.fileitem');
  $items.find(".fileitem-delete").click(function (e) {
    console.log($(this).parent(), $items.index($(this).parent()));  
    console.log($(this).parent().data('filebox-id'));

    var id = $(this).parent().data('filebox-id');
    var fileboxList = fileboxLists[id];
    fileboxList.deleteIdx($items.index($(this).parent()))
    renderFilelist(renderTarget, fileboxLists, id);
  })
}
/* filebox List */
function fileboxList(id, maxSize) {
  var fileList = this.fileList = [];
  this.fileboxId = id;
  this.maxSize = maxSize || 10 * 1024 * 1024;
}

fileboxList.prototype.isExceed = function (file) {
  var sizeBefore = this.fileList.reduce(function (total, file) {
    return total + file.size;
  }, 0)
  console.log("size :", sizeBefore / 1024);
  return file.size + sizeBefore > this.maxSize;
}

fileboxList.prototype.concat = function (files) {
  var isExceed = false;
  for (var i = 0; i < files.length; i++) {
    isExceed = !this.push(files[i]);  
    if (isExceed) break;
  }
  return !isExceed;
}

fileboxList.prototype.push = function (file) {
  if (this.isExceed(file)) {
    return false;  
  }
  this.fileList.push(file);
  return true;
}

fileboxList.prototype.render = function() {
  var fileboxId = this.fileboxId;
  var rendered =  this.fileList.map(function(file) {
    return "<div class='fileitem' data-filebox-id=" + fileboxId + ">" + 
    "<span class='fileitem-name'>" + file.name + "</span>" +
    "<span class='fileitem-size'>" + toKb(file.size, 1) + "KB</span>" + 
    "<span class='fileitem-delete'></span></div>";  
  })  

  return rendered.join("");
}

fileboxList.prototype.deleteIdx = function(idx) {
  this.fileList.splice(idx, 1);
}

/* util */
function toKb(byte, roundSize) {
  var kb = byte / 1024
  var round = Math.pow(10, roundSize);
  return  Math.round(kb * round) / round;
}