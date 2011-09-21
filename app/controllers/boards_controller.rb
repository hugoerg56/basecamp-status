require 'cachebasecamp'

class BoardsController < ApplicationController

  def index
    response.headers['Cache-Control'] = 'public, max-age=300'
    page = !params[:page].nil? ? params[:page] : 1
    @todos = CachedTodo.all
    @venues  = []
    finded = false
    @todos.each do |item|
      @venues.each do |venue|
        if venue == item.venue
          finded = true
          break
        end
      end
      if finded == false
        @venues << item.venue
      else
        finded = false
      end
    end
  end
  
  def get_person_by_project
    @b_obj = Cachebasecamp.new
    persons = @b_obj.get_person_by_project(params[:project_id])
    render :json => persons
  end
  
  def update_todo_item_assigned
    @b_obj = Cachebasecamp.new
    @b_obj.update_todo_item_assigned(params)
    item = CachedTodo.first(:item_id => params[:item_id].to_i)
    item.asigned_to = params[:responsible_party_name]
    item.save
    render :text => 'updated'
  end

end
