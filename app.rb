require 'sinatra'
require 'pry'
require 'json'

get '/' do
  erb :'index'
end

get '/favorites' do
  "Hello World"
end

post '/favorites' do
  binding.pry
  console.log("Fuck")
  # params = JSON.parse(request.env["rack.input"].read)
  # file = JSON.parse(File.read('data.json'))
  # return 'Invalid Request' unless params[:name] && params[:oid]
  # movie = { name: params[:name], oid: params[:oid] }
  # file << movie
  # File.write('data.json',JSON.pretty_generate(file))
  # movie.to_json
end
