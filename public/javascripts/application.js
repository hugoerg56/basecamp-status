// Filter by Person

var names = [];
var Persons_name = new Array();
var Persons_id = new Array();
var active =  false;
var aux_name_to_back = '';
var find = false;
function get_names(){
  $("span.assigned-to").each(function(index) {
    names[index] = $(this).text().trim();
    names = $.unique(names);
    names.length = names.length - 1;
  });
};

function fill_select(){
  $.each(names,function(index,value){
    $("#names").append("<option value="+ (index + 1) +">"+value+"</option>");
  });
};

function show_all_tasks(){
  $(".item").each(function(){
    $(this).fadeIn('slow');
  });
}

function hide_all_tasks(){
  $(".item").each(function(){
    $(this).fadeOut('fast');
  });
}

function filter_by_name(){  
  if ($("#names").val() == 0){
    show_all_tasks();
  }
  else{
    name = names[$("#names").val()-1];
    hide_all_tasks();
    $("span.assigned-to").each(function(){
      if ($(this).text().trim() == name){
        $(this).parent().fadeIn('slow');
      };
    });
  };
};

$(document).ready(function(){ 
  
  $("#venue_list").css('height', ($(document).height() - 265));
  
  $("#show_venue_list").click(function(){
    $("#venue_list").toggle();  
  });
  
  get_names();
  fill_select();
  $('#names').change(function() {
    filter_by_name();
  });
  
  $("#main_board").tablesorter(); 

  $(".asigned_to").each(function(){
    $(this).click(function(){
       if (active == false){
        aux_name_to_back = $(this).html();
        active = true;
         p_id = $(this).attr('id').split("-");
         tempObj = this;
         $(this).append("<img id='loading-icon' src='/images/loading.gif'/>");
         $.post("/board/persons/", { project_id: p_id[0] }, function(data){
          $("#loading-icon", tempObj).remove();
          $(tempObj).html("<input id='temp_input' style='width: 110px; margin-right: 4px;' type='text' value='"+ $(tempObj).html().trim() +"'>");
          $(tempObj).append("<img id='change_name_ready' src='/images/positive.png'/>");
          $("#change_name_ready").click(function(){
             $("#change_name_ready").parent().html( $('input', $("#change_name_ready").parent()).val() );
             var name_aux = $(tempObj).html();
             $(tempObj).append("<img id='loading-icon' src='/images/loading.gif'/>");
             save_assigned(name_aux, $(tempObj).attr('id'));
          });
          for(i=0; i<=(data.length -1);i++){
            Persons_name[i] = data[i].person.first_name + " " + data[i].person.last_name;
            Persons_id[i] = data[i].person.id;
          }
          $("#temp_input").autocompleteArray(Persons_name, { minChars:1, delay: 200 });
        });
      }
    });
  });
 
});

function save_assigned(person_name, item){
  item_id = item.split('-');
  for(i=0; i<=(Persons_name.length);i++){
    if (Persons_name[i] == person_name){
      $.post("/board/persons/update", { item_id:  item_id[2], responsible_party_name: Persons_name[i], responsible_party_id: Persons_id[i]}, function(data){
        $("#loading-icon").remove();
      });
      find = true;
    }
  }
  if(find == false){
    $("#"+item).html(aux_name_to_back);
  }
  setTimeout("active = false", 500);
}

function hide_show(class_name){
  $("."+class_name).toggle();
}


