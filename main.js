
var countries = [ { "nazione" : "italia", "id" : "IT", "flag" : "images/"},       { "nazione" : "spagna", "id" : "ES", "flag" : "images/"},
                  { "nazione" : "canada", "id" : "CA", "flag" : "images/"},       { "nazione" : "australia", "id" : "AU", "flag" : "images/"},
                  { "nazione" : "norvegia", "id" : "NO", "flag" : "images/"},     { "nazione" : "argentina", "id" : "AR", "flag" : "images/"},
                  { "nazione" : "portogallo", "id" : "PT", "flag" : "images/"},   { "nazione" : "olanda", "id" : "NL", "flag" : "images/"},
                  { "nazione" : "statiUniti", "id" : "US", "flag" : "images/"},   { "nazione" : "inghilterra", "id" : "GB", "flag" : "images/"},
                  { "nazione" : "francia", "id" : "FR", "flag" : "images/"},      { "nazione" : "svizzera", "id" : "CH", "flag" : "images/"},
               ];


/* *** HTML Holidays list structure *** */
var holidayDivOpen = "<div class='holiday'>",
    holidayDivClose = "</div>";

// 4283f11a-0c36-490a-a135-7df8f7c954d4
$(document).ready(function(){

   //Ciclo che genera 64 celle
   for (var i = 0; i < 12; i++) {
      $('.grid-container').append( "<div id=" + countries[i].id + " class=grid-item></div>");
      $("#"+countries[i].id).append("<div>" + countries[i].nazione + "</div>");
   }

   $('.grid-item').click(function(){

      $("form").removeClass("hidden");
      var itemClicked = $(this);
      var id = this.id;





      $("form").submit(function(){

         var monthIsCorrect = false;
         var yearIsCorrect = false;

         var currentMonth = $("#month").val();
         var currentYear = $("#year").val();

         console.log(moment([currentYear, 0, 2]));

         /**** Controllo immissione dati corretta da migliorare ****/

         // if ( !(currentMonth == 0) ) {
         //    monthIsCorrect = true;
         // } else {
         //    alert("Scegli il mese");
         //    $("form").removeClass("hidden");
         // }
         //
         // if ( (currentYear<2000) || (currentYear>2017) ) {
         //    alert("Inserisci un anno compreso tra il 2000 e il 2017");
         // } else {
         //    yearIsCorrect = true;
         // }
         $("form").addClass("hidden");
         console.log(currentMonth);
         console.log(currentYear);
         console.log(id);

         $.ajax({
            url : "https://holidayapi.com/v1/holidays",
            method : "GET",
            data : {
               key : "4283f11a-0c36-490a-a135-7df8f7c954d4",
               country : id,
               year : currentYear,
               month : currentMonth
            },
            success : function(data) {
               console.log(data);
               var holidayListBox = $('.holidays-list');

               var firstYearDay = moment(currentYear + "-01-02", "YYYY-MM-DD"); /*Perchè mettere 02??????*/
               console.log("firstYearDay: " + firstYearDay);


               var datet = moment("2017-04-17");
               var d = datet.day()
               

               holidayListBox.removeClass('hidden');

               for (var i = 0; i < data.holidays.length; i++) {

                  var thisHolidayDate = moment(data.holidays[i].date);

                  console.log(data.holidays[i].date.isoW);

                  var difference = thisHolidayDate.diff(firstYearDay, 'days');



                  holidayListBox.append(
                     holidayDivOpen + data.holidays[i].name + ": " + data.holidays[i].date +
                     " giorni passati dal: " + currentYear + "-01-01: " + difference + holidayDivClose
                  );
               }

            },
            error : function(errore) {
               console.log(errore);
            }
         });

         return false

      });





      //Ad ogni click dell'item rimuove la classe, se presente, che inizia con bg-
      // itemClicked.removeClass(function (index, css) {
	   //    return (css.match (/\bbg-\S+/g) || []).join(' '); // removes anything that starts with "page-"
      // });

      //itemClicked.removeClass("class^='bg-'");

      // if ( itemClicked.hasClass('bg-green') ) {
      //    itemClicked.removeClass('bg-green');
      // } else if ( itemClicked.hasClass('bg-yellow') ) {
      //    itemClicked.removeClass('bg-yellow');
      // }

      //console.log("id: " + id );

      // var num = randomNumber(0, 9);
      // $.ajax({
      //    url: "https://www.boolean.careers/api/random/int",
      //    method: "GET",
      //    success: function(data, state) {
      //
      //       if (itemClicked.hasClass('error') ) {
      //          itemClicked.removeClass('error');
      //       }
      //
      //       var randomNumber = data.response;
      //       console.log(randomNumber);
      //
      //       itemClicked.text(randomNumber);
      //
      //       if (randomNumber <= 5) {
      //          itemClicked.addClass('bg-yellow');
      //       } else {
      //          itemClicked.addClass('bg-green');
      //       }
      //
      //    },
      //    error: function(){
      //       itemClicked.addClass('error');
      //    }
      // });

   });

});
