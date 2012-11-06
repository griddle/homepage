class HomeController < ApplicationController
  def index
  end
  
  def projects_request
    # -----------------------------------------------------------------------------------------------
    # the worlds most incredible user management system, behold
    # -----------------------------------------------------------------------------------------------
    lines = []
    File.open("pw.txt", "r").each_line do |line|
      lines.push line
    end
    current_pw = lines[0].strip  # projects pw is first line of pw.txt w/out leading or trailing spaces
    
    if params[:pw] && params[:pw] == current_pw
      render :json => { :page => render_to_string(partial: "/home/pages/projects_with_access.html.haml") }
    else
      render :json => { :error => "invalid password" }
    end
  end
  
  
end
