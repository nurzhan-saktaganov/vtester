import json
import random

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
		letters = ['A', 'B', 'C', 'D', 'E']
		random.shuffle(letters)
		question = {
			'question': questionRawSplitted[0],
			'answers': {
				letters[i]: questionRawSplitted[i+1]
				for i in range(5)
			},
			'correctAnswer': letters[0],
		}
		questions.append(question)

	with open('dataRK2.js', 'w') as file:
		file.write('var rk2Data = ')
		file.write(json.dumps(questions))

if __name__ == '__main__':
	main()
