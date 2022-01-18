function enableEdit() {
      $(".sidebar-links").each(function() {
        $(this).on('click', function(e){
        e.preventDefault();
          loadPage($(this).attr('data-action'),{id: $(this).attr('data-id')});
        });
      });
    }

 function loadPage(url, data) {
      // show debug data
      console.log('Loading Page:'+url);
      console.log('Sending Page Post Data:'+data);
      // This is a loading page spinner
      $('#loader').show();

      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data)
        {
          // Show the page in the container
          $('.content-wrapper').html(data);
          // Fadeout the spinning page loader
          $('#loader').fadeOut('slow');
        },
        error: function(error)
        {
          // Fadeout the spinning page loader
          $('#loader').fadeOut('slow');
        },
        statusCode: {
          404: function() {
            if(window.debugMode == true) console.log('404 page not found');
            // Show an error message
            $('.right_col').html('<div><h1>404 Page Not Found</h1><h2>Sorry but we couldn\'t find this page</h2></div>');
            // Fadeout the spinning page loader
            $('#loader').fadeOut('slow');
          }
        }
      });
    }

    enableEdit()