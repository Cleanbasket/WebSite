$(document).ready(function () {
  expandableInit();
})

function expandableInit() {
  $('.expandable-item').map(function (index, item) {
    var $item = $(item);
    $item.find('.expandable-toggle').click(function () {
      var $this = $(this);
      $item.toggleClass('opened');
      if ($item.hasClass('opened')) {
        $this.removeClass('icon-arrow-down').addClass('icon-arrow-up');
      } else {
        $this.removeClass('icon-arrow-up').addClass('icon-arrow-down');
      }
    })
  })
}