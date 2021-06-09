desc "Reads the information in the database and generates a summary or roll-up of the data"
task :report do
    hashKey = {}
    puts hashKey
end

desc "Search the information in the database"
task :search => :environment do
   puts Buildpack.search(ARGV[1])
end

