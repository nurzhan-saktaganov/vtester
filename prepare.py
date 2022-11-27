import json

def main():
	with open('rk2.txt', 'r') as file:
		data = file.read().replace('\n', '')

	questionsRaw = data.split('<question>')
	questions = []

	for questionRaw in questionsRaw:
		questionRaw = questionRaw.strip()
		if questionRaw == '':
			continue
		questionRawSplitted = questionRaw.split('<variant>')
		question = {
			'question': questionRawSplitted[0],
			'answers': {
				str(i+1): questionRawSplitted[i+1]
				for i in range(5)
			}
		}
		questions.append(question)

	with open('data.js', 'w') as file:
		file.write('var testData = ')
		file.write(json.dumps(questions))

if __name__ == '__main__':
	main()
