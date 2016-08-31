function m_expandable_init() {
  var $trigger = $('.expandable-trigger');
  var $content = $('.expandable-content');
  $trigger.click(function (e) {
    var id = $(this).data("expandable-id");
    console.log(id);

    var $target = $content.filter(function () {
      return $(this).data("expandable-id") == id;
    })

    $target.toggleClass('closed');
  })
}