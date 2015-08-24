require 'sinatra'
require "sinatra/reloader"
require "better_errors"
require 'pry'
require 'json'

get '/' do
  erb :'index'
end

get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

post '/favorites' do
  params = JSON.parse(request.env["rack.input"].read)
  movie = {name: params["name"], oid: params["oid"] }
  return 'Invalid Request' unless params["name"] && params["oid"]
  file = JSON.parse(File.read('data.json'))
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
