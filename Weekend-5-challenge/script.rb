# Read text from a file
def read_text_from_file(filename)
    File.read(filename)
end

=begin 
 try using Ruby methods
 it's similar to using a function in js
 look up function/method `read_text_from_file` as an example
 structure: 
 def method_name
    logic of method goes in here
 end

=end

# logic for text_analyzer requirments go here:


# Analyze the sample text
filename = 'sample.txt' # Replace with your text file
text = read_text_from_file(filename)

# use `text` ^ to pass as a parameters to your methods


# 1. Implement a function that counts the number of words in the document.
def count_words(text)
    words = text.split 
    words.count 
end

# 2. Implement a function that counts the number of characters in the document.
def count_characters(text)
    text.gsub(/\s+/, '').length # Using regex to substitue whitespace with nothing so that we don't count it as characters. 
end

# 3. Implement a function that counts the number of paragraphs in the document (paragraphs are separated by empty lines).
def count_paragraphs(text)
    paragraphs = text.split(/\n\s*\n/) # Using regex (/s* = 0 or more white space occurrences together) to split string by paragraph
    paragraphs.count
end

# 4. Identify the most common word in the document and display it along with its frequency.
def word_frequencies(text)
    words = text.downcase.scan(/\b[\w']+\b/) # Using regex (/\b[\w']+\b/ = finding words in  string)
    word_frequencies = Hash.new(0)

    # Count the frequency of each word
    words.each { |word| word_frequencies[word] += 1 } # For every word in words, going to add to the hash word-frequencies value by 1

    # Find the most common word and its frequency
    $most_frequent = word_frequencies.max_by { |_, count| count } # Compare the hash values for the greatest 

    $most_frequent # Returns a tuple [word, frequency]
end

# 5. Provide word frequency statistics, listing the top 10 most common words and their frequencies.
# - Utilize appropriate data structures (e.g., arrays, hashes) to manage the data efficiently.
# - Use blocks and sorting to organize the word frequency statistics.
def top_10_words(text)
    words = text.downcase.scan(/\b[\w']+\b/) # Split text into words
    word_frequencies = Hash.new(0)
  
    # Count the frequency of each word
    words.each { |word| word_frequencies[word] += 1 } #For every word in words, going to add to the hash word-frequencies value by 1
  
    
    $top_10 = word_frequencies.sort_by { |_, count| -count }.first(10) #Sort the hash values by highest to lowest and grabs the first 10 
  
    $top_10 # Returns an array of [word, frequency] pairs
  end

# Calling the methods
word_frequencies(text)
top_10_words(text)

# puts statements to console go here:

puts "Word Count: #{count_words(text)}"
puts "Character Count: #{count_characters(text)}"
puts "Paragraph Count: #{count_paragraphs(text)}"
puts "Most Common Word: '#{$most_frequent[0]}' (Appear #{$most_frequent[1]} times)"
puts "Top 10 Most Common Word:"
$top_10.each{|index| puts "- '#{index[0]}' - #{index[1]} times"} 
