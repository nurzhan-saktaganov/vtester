import json
import random

subjectName = 'personTypeExam'

def main():
	infile = '{0}.txt'.format(subjectName)

	with open(infile, 'r') as file:
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

	outfile = '{0}.js'.format(subjectName)

	with open(outfile, 'w') as file:
		varname = '{0}Data'.format(subjectName)
		file.write('var {0} = '.format(varname))
		file.write(json.dumps(questions))

if __name__ == '__main__':
	main()
