import json

def main():
	with open('psych.txt', 'r') as file:
		data = file.read()

	questions = []

	lines = [line.strip() for line in data.split('\n') if line.strip() != '']

	cnt = len(lines) // 5
	for i in range(cnt):
		offset = 5 * i
		q, a, b, v, g = lines[offset:offset+5]
		correct = 'x'

		is_key = set(['а', 'б', 'в', 'г'])

		if not q[0].isnumeric():
			print('Not question: '+ q)
			return

		l = []
		for x in [a, b, v, g]:
			is_correct = x.startswith('+')
			if is_correct:
				x = x[1:] # remove +
			key = x[0]

			if not key in is_key:
				print('Is not key: ' + x)
				print('Question: ' + q)
				return

			x = x[2:] # remove A)
			if is_correct:
				correct = key
			l.append(x)

		a, b, v, g = l

		question = {
			'question': q,
			'answers': {
				'а': a,
				'б': b,
				'в': v,
				'г': g,
			},
			'correctAnswer': correct
		}

		questions.append(question)

	cnt = {}
	for q in questions:
		t = q['question']
		n = t.split('.')[0]
		cnt[n] = cnt.get(n, 0) + 1
		if cnt[n] != 1:
			print('Duplicated question: ' + n)

	with open('dataPsych.js', 'w') as file:
		file.write('var psychData = ');
		file.write(json.dumps(questions))

if __name__ == '__main__':
	main()
