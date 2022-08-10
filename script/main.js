function selDay(day, year, month) {
    $("#tododaydetail").text(year + "年 " + (month + 1) + "月 " + day + "日");
}
$(document).ready(function () {

    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];

    //获取某年某月第一天是星期几
    function dayStart(month, year) {
        var tmpDate = new Date(year, month, 1);
        return (tmpDate.getDay());
    }

    //计算某年是不是闰年，通过求年份除以4的余数即可
    function daysMonth(month, year) {
        var tmp = year % 4;
        if (tmp == 0) {
            return (month_olympic[month]);
        } else {
            return (month_normal[month]);
        }
    }

    var my_date = new Date();
    var my_year = my_date.getFullYear();
    var my_month = my_date.getMonth();
    var my_day = my_date.getDate();

    function refreshDate() {

        var totalDay = daysMonth(my_month, my_year); //获取该月总天数
        var firstDay = dayStart(my_month, my_year); //获取该月第一天是星期几

        $("#Year").text(my_year);
        $("#Month").text(month_name[my_month]);

        var container = $(".container");

        var str = "";

        count = 1;
        for (var i = 1; i < firstDay; i++) {
            if (count === 1 || count % 7 === 1) {
                str += "<div class=\"row datecontainer\">";
            }
            var strcld = "";
            //strcld = strcld + "<div class=\"daycontainer\"><div id =\"nulldayid" + i + "\" class=\"firstFlowFirstColm ddaycontainer\">" + "" + "</div ></div >";
            str = str + "<div class=\"col-xs-6 col-sm-1 firstFlow\">" + strcld + "</div >";
            if (count % 7 === 0) {
                str += "</div>";
                container.append(str);
                str = "";
            }
            count++;
        }
        for (var i = 1; i <= totalDay; i++) {
            if (count === 1 || count % 7 === 1) {
                str += "<div class=\"row datecontainer\">";
            }
            var myclass = "";
            if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
                myclass = "ddaycontainer mouseOn"; //当该日期在今天之前时，以浅灰色字体显示
            } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
                //myclass = " class='green greenbox'"; //当天日期以绿色背景突出显示
                myclass = "todaystyle mouseOn";
            } else {
                myclass = "ddaycontainer mouseOn"; //当该日期在今天之后时，以深灰字体显示
            }
            var strcld = "";
            strcld = strcld + "<div onclick=\"selDay(" + i + ", " + my_year + ", " + my_month + ");\" class=\"daycontainer\"><div id =\"dayid" + i + "\" class=\"firstFlowFirstColm " + myclass + "\">" + i + "</div ></div >";
            str = str + "<div class=\"col-xs-6 col-sm-1 firstFlow\">" + strcld + "</div >";
            if (count % 7 === 0) {
                str += "</div>";
                container.append(str);
                str = "";
            }
            count++;
        }
        if (count % 7 != 0) {
            str += "</div>";
            container.append(str);
        }
    }
    refreshDate();
    $("#preMonth").click(function () {
        $(".datecontainer").remove();
        my_month--;
        if (my_month < 0) {
            my_year--;
            my_month = 11;
        }
        refreshDate();
    });
    $("#afterMonth").click(function () {
        $(".datecontainer").remove();
        my_month++;
        if (my_month > 11) {
            my_year++;
            my_month = 0;
        }
        refreshDate();
    });
    $("#homeBtn").click(function () {
        my_month = my_date.getMonth();
        my_day = my_date.getDate();
        $(".datecontainer").remove();
        refreshDate();
        $("#tododaydetail").text(my_date.getFullYear() + "年 " + (my_date.getMonth() + 1) + "月 " + my_date.getDate() + "日");
    });
    $("#tododaydetail").text(my_date.getFullYear() + "年 " + (my_date.getMonth() + 1) + "月 " + my_date.getDate() + "日");

});