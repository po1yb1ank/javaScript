const DEPHIS = '-',
    LONG_DEPHIS = '—',
    WRONGS_QUOTES = { 1: '“', 2: '”' },
    RIGHT_QUOTES = { 1: '«', 2: '»' },
    TAB = ' ',
    NUMBERS = {
        '0': 'ноль',
        '1': 'один',
        '2': 'два',
        '3': 'три',
        '4': 'четыре',
        '5': 'пять',
        '6': 'шесть',
        '7': 'семь',
        '8': 'восемь',
        '9': 'девять',  
    };


class AbstractExpression {
    constructor(context) {
        this.context = context;
    }

    static interpret(context) {
        let correct = context;
        correct = NextString.interpret(correct)
        correct = Spaces.interpret(correct);
        correct = Dephis.interpret(correct);
        correct = Quotes.interpret(correct);
        correct = Tabs.interpret(correct);
        correct = Brackets.interpret(correct);
        correct = Numbers.interpret(correct);

        this.context = correct;
    }

    static showContext() {
        return this.context
    }
}

class Spaces extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === ' ' && context[i + 1] === ' ') {
                delete context[i]
            }
        }
        context = context.join('');
        return context
    }
}

class Dephis extends AbstractExpression {
    static interpret(context) {
        context = context.split('');

        for (let i = 0; i < context.length; i++) {
            if (context[i - 1] === ' ' && context[i] === DEPHIS && context[i + 1] === ' ') {
                context[i] = LONG_DEPHIS
            }
        }
        context = context.join('');
        return context
    }
}

class Quotes extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === WRONGS_QUOTES["1"]) {
                context[i] = RIGHT_QUOTES["1"];
            } else if (context[i] === WRONGS_QUOTES["2"]) {
                context[i] = RIGHT_QUOTES["2"];
            }
        }
        context = context.join('');
        return context
    }
}

class Tabs extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === TAB && context[i + 1] === TAB) {
                delete context[i]
            }
        }
        context = context.join('');
        return context
    }
}

class Brackets extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === ' ' && (context[i + 1] === ')' || context[i + 1] === ',' || context[i + 1] === '.')) {
                delete context[i]
            }
            if (context[i] === '(' && context[i + 1] === ' ') {
                delete context[i + 1]
            }
        }
        context = context.join('');
        return context
    }
}

class Numbers extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] in NUMBERS) {
                let num = NUMBERS[context[i]];
                context[i] = num;
            }
        }
        context = context.join('');
        return context
    }
}

class NextString {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === DEPHIS && context[i + 1] === DEPHIS) {
                delete context[i];
                context[i + 1] = DEPHIS
            }
        }
        context = context.join('');
        return context
    }
}

AbstractExpression.interpret('Сейчас 597475957слева были удалены лишние пробелы. А тут вместо - будет —. Сейчас будут 2 исправлены “кавычки”. ' +
    'Теперь уйдет 5 лишняя табуляция. ( лишний пробелы ) , а также перед знаками 45 препинания . Лишние знаки пере--' +
    'носа строки убраны');
console.log(AbstractExpression.showContext());