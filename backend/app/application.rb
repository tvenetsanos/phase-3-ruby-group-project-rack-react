class Application

  def call(env)
    resp = Rack::Response.new
    req = Rack::Request.new(env)

    if req.path.match(/test/) 
      return [200, { 'Content-Type' => 'application/json' }, [ {:message => "test response!"}.to_json ]]

    elsif req.path.match(/users/)
      if req.env["REQUEST_METHOD"] == "GET"
        users = User.all
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => users}.to_json ]]
      else
        form_data = JSON.parse(req.body.read)
        new_user = User.create(form_data)
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => new_user}.to_json ]]
      end
    elsif req.path.match(/games/)
      if req.env["REQUEST_METHOD"] == "GET"
        if req.params["userId"]
          games = Game.where(user_id: req.params["userId"])
        else
          games = Game.all
        end
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => games}.to_json ]]
      elsif req.env["REQUEST_METHOD"] == "DELETE" 
        form_data = JSON.parse(req.body.read)
        game = Game.destroy(form_data["id"])
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => game}.to_json ]]
      else
        form_data = JSON.parse(req.body.read)
        new_game = Game.create(form_data)
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => new_game}.to_json ]]
      end
    elsif req.path.match(/consoles/)
      if req.env["REQUEST_METHOD"] == "GET"
        if req.params["userId"]
          consoles = Console.where(user_id: req.params["userId"])
        else
          consoles = Console.all
        end
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => consoles}.to_json ]]
      elsif req.env["REQUEST_METHOD"] == "DELETE" 
        form_data = JSON.parse(req.body.read)
        console = Console.destroy(form_data["id"])
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => console}.to_json ]]
      else
        form_data = JSON.parse(req.body.read)
        new_console = Console.create(form_data)
        return [200, { 'Content-Type' => 'application/json' }, [ {:message => new_console}.to_json ]]
      end
    else
      resp.write "Path Not Found"

    end

    resp.finish
  end

end
