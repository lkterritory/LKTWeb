

//캘린더
function createCalendar(){
  const msInDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  const initialValue = [
    new Date(now.getTime() - msInDay * 3),
    new Date(now.getTime() + msInDay * 3),
  ];

  $('#range-selection').dxDateRangeBox({
    value: initialValue,
    onValueChanged: showSelectedDays,
  });

  function getCurrentMonthRange() {
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const min = new Date(now.setDate(1));
    const max = new Date(now.setDate(lastDay));

    return { min, max };
  }

  function showSelectedDays({ value: [startDate, endDate] }) {

    let daysCount = 0;
    if (startDate && endDate) {
      daysCount = (endDate - startDate) / msInDay + 1;
    }
    
    $('#days-selected').text(daysCount);
  }

  showSelectedDays({ value: initialValue });
}
$(document).ready(function(){




  createCalendar();
})