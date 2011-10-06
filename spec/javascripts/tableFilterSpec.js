describe("TableFilter Specs", function() {

  beforeEach(function() {
    loadFixtures('toTableFilter.html');
    $("#test_table").tableFilter({divToDraw: 'divDrawFilter'});
  });
  
  it("click on tableFilterToggleBtn display & hide filter", function(){
    expect($("#_tableFilterList")).toBeHidden();
    $("#_tableFilterToggleBtn").click();
    expect($("#_tableFilterList")).not.toBeHidden();
  });

  it("uncheck all on column 1", function() {
    $("#_tableFilterToggleBtn").click();
    $("#_tableFilterList input.col1.checkall").click(); //uncheck
    expect($("._tablefilter_row0")).toBeHidden();
    expect($("._tablefilter_row1")).toBeHidden();
    expect($("._tablefilter_row2")).toBeHidden();
  });

  it("check all on column 1", function() {
    $("#_tableFilterToggleBtn").click();
    $("#_tableFilterList input.col1.checkall").click(); //uncheck
    $("#_tableFilterList input.col1.checkall").click(); //check
    expect($("._tablefilter_row0")).not.toBeHidden();
    expect($("._tablefilter_row1")).not.toBeHidden();
    expect($("._tablefilter_row2")).not.toBeHidden();
  });
  
  it("uncheck Hugo from filter", function() {
    $("#_tableFilterToggleBtn").click();
    $("#_tableFilterList input.checkoption[value='Hugo']").click();
    expect($("._tablefilter_row0")).toBeHidden(); //row0 'Hugo' should be hidden
    expect($("._tablefilter_row1")).not.toBeHidden();
    expect($("._tablefilter_row2")).not.toBeHidden();
  });
  
  

});