$(function () {
    $.ajax({
        url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=CWB-6C70C828-F2E5-44AC-993C-4C888D294CC3&elementName=T',
        type: "GET",
        dataType: "json",
        success: function (resource) {
            console.log(resource);
            // 確認抓到行政區
            // console.log(resource.records.locations[0].location[0].locationName);

            let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let j = 0;

            // 市
            $('#city_name').html(resource.records.locations[0].locationsName);
            // 區
            $('#district').html(resource.records.locations[0].location[0].locationName);
            // 溫度
            $('#tempture').html(resource.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value + "&#176");


            // ()有東西=塞資料
            // ()沒東西=取資料


            // 跑一個禮拜for迴圈(let weekday)
            for (let i = 0; i < 10; i++) {
                // 在迴圈裡面找現在資料在哪
                // 找星期幾 small元素
                console.log($('.block').eq(i).find('small').html());
                // 找星期幾的溫度h6>strong
                console.log($('.block').eq(i).find('h6').html());


                if ((i % 2) == 0) {
                    let T = resource.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                    let tempture = `<strong>${T}&#176;</strong>`;
                    let wd = resource.records.locations[0].location[0].weatherElement[0].time[i].startTime;



                    $('.block').eq(j).find('h6').html(tempture);
                    const d = new Date(wd);
                    // 設成索引值
                    let day_index = d.getDay();

                    // 從今天開始算的一周天氣
                    $('.block').eq(j).find('small').html(weekday[day_index]);
                    j++;
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
})
