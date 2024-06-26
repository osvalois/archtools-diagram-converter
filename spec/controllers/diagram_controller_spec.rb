require 'spec_helper'

RSpec.describe DiagramController, type: :controller do
  it 'converts SQL to ERB' do
    post '/convert/sql/erb', file: Rack::Test::UploadedFile.new('spec/fixtures/test.sql', 'text/plain')
    expect(last_response).to be_ok
    expect(last_response.body).to include('digraph ER')
  end

  it 'converts ERB to PNG' do
    post '/convert/erb/image', file: Rack::Test::UploadedFile.new('spec/fixtures/test.sql', 'text/plain')
    expect(last_response).to be_ok
    expect(last_response.header['Content-Type']).to eq('image/png')
  end
end
