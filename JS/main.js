/*** save button **/
$("#saveBtn").click(function() {
        $("#tableData tbody ").append('<tr><td >' + $("#sno").val() + '</td><td>' + $("#name").val() + '</td><td>' + $("#address").val() + '</td><td>' + $("#empId").val() + '</td><td><button type="button" id="editRow">Edit</button></td><td><button type="button" id="delRow">Delete</button></td><td><button type="button" id="viewRow">View</button></td><td><span id="rr" class="glyphicon glyphicon-info-sign" ></span></td></tr>');
    
});
$('#emp').click(function() {
            $("#updatebtn").hide();
            $('#saveBtn').show();
        })


/*** remove ***/
$("#tableData").on('click', '#delRow', function () {
    $(this).closest('tr').remove();
});

/*** carousel ***/
 $(document).ready(function() {

     var O = $.ajax({
        url: 'JSON/images.json',
        type: 'GET',
        dataType: 'JSON'

    });

    O.success(function(data) {
        var pics = data;
        for (var i = 0; i < pics.Images.length; i++) {
            $('#coro img').eq(i).attr("src", pics.Images[i]);
        }
        for (var i = 0; i < pics.Item.length; i++) {
            $('.description').eq(i).html(pics.Item[i].description);
            $('.title').eq(i).html(pics.Item[i].title);
            $('.itemholder img').eq(i).attr('src', pics.Item[i].logo);
        }
    });
 /*********Edit*******/
 var cell1, cell2, cell3, cell4;
 $(document).on("click", "#editRow", function() {
     $('#myTable').modal('show');
     $('#updatebtn').show();
     $('#saveBtn').hide();

     var tr = $(this).closest('td').parent();
     cell1 = tr.find('td').eq(0);
     cell2 = tr.find('td').eq(1);
     cell3 = tr.find('td').eq(2);
     cell4 = tr.find('td').eq(3);
     $('#sno').val(cell1.text());
     $('#name').val(cell2.text());
     $('#address').val(cell3.text());
     $('#empId').val(cell4.text());
 });
 
 $('#updatebtn').click(function() {
     cell1.text($('#sno').val());
     cell2.text($('#name').val());
     cell3.text($('#address').val());
     cell4.text($('#empId').val());
     $('#myTable').modal('hide');

 });
 /**** view*****/
 $(document).on("click", "#viewRow", function() {
        $('#myTable1').modal('show');
        var tr = $(this).closest('td').parent();
        $('#content').html('S.no:' + tr.find('td').eq(0).text() + '</br>' + 'Name:' + tr.find('td').eq(1).text() + '</br>' + 'Address:' + tr.find('td').eq(2).text() + '</br>' + 'Address:' + tr.find('td').eq(3).text());
    });

/** separate views****/
$('#details1').click(function() {
        $('#content').html($('.details').eq(0).find('p').text());
        $('#myTable1').modal('show');

    });
$('#details2').click(function() {
        $('#content').html($('.details').eq(1).find('p').text());
        $('#myTable1').modal('show');

    });
$('#details3').click(function() {
        $('#content').html($('.details').eq(2).find('p').text());
        $('#myTable1').modal('show');

    });
$('#details4').click(function() {
        $('#content').html($('.details').eq(3).find('p').text());
        $('#myTable1').modal('show');

    });

/***********tooltip**********/
$(document).on("mouseover", "#rr", function() {
        var tr = $(this).closest('td').parent();
        $(this).tooltip({
            title: tr.find('td').eq(1).text() + '  ' + tr.find('td').eq(2).text() ,
            placement: "top"
        });


    });
});


 /*****sorting******/
 var f_sl = 1;
    $('#snBtn').click(function() {
        $('#snBtn span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        f_sl *= -1;
        var n = $(this).prevAll().length;
        sortTable(f_sl, n);
    });

    function sortTable(f, n) {
        var rows = $('#tableData tbody  tr').get();

        rows.sort(function(a, b) {

            var A = Number($(a).children('td').eq(n).text());

            var B = Number($(b).children('td').eq(n).text());

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        $.each(rows, function(index, row) {
            $('#tableData').children('tbody').append(row);
        });
    }