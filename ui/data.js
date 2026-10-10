// Tasks and cases extracted from examples/tasks and examples/cases.
// Descriptions come from the PDFs, code from the .py solutions.
// Each `run` function mirrors the Python solution using JS regex.
// Python's \w and \b are Unicode-aware, so W / B below emulate them.

const W = "[\\p{L}\\p{N}_]";          // Python \w
const B = `(?<!${W})(?=${W})`;        // Python \b at the start of a word

function pyList(items) {
  return "[" + items.map(s => "'" + s + "'").join(", ") + "]";
}

function pyDict(keys, values) {
  const n = Math.min(keys.length, values.length);
  const pairs = [];
  const seen = new Map();
  for (let i = 0; i < n; i++) seen.set(keys[i], values[i]);
  for (const [k, v] of seen) pairs.push(`'${k}': '${v}'`);
  return "{" + pairs.join(", ") + "}";
}

function findall(pattern, flags, text) {
  return [...text.matchAll(new RegExp(pattern, flags))].map(m => m[0]);
}

const TASKS = [
  {
    id: "task1",
    title: "Words containing vowels",
    description: "Create a Python program which matches a word containing vowels in it (a, ı, o, u, e, ə, i, ö, ü).",
    file: "examples/tasks/task1.py",
    pattern: String.raw`\w+[aıoueəiöü]\w+`,
    input: "salam dunya ssss",
    code: String.raw`import re

pattern="\w+[aıoueəiöü]\w+"

result = re.findall(pattern,"salam dunya ssss")
print(result)`,
    run: text => pyList(findall(`${W}+[aıoueəiöü]${W}+`, "gu", text)),
  },
  {
    id: "task2",
    title: "Vowels not at start or end",
    description: "Create a Python program which matches a word containing vowels not at the start or end of the word (a, ı, o, u, e, ə, i, ö, ü).",
    file: "examples/tasks/task2.py",
    pattern: String.raw`[^(a|ı|o|u|e|ə|i|ö|ü)]`,
    input: "elnur ddikkhmji",
    code: String.raw`import re
myString="elnur ddikkhmji"

pattern=r"[^(a|ı|o|u|e|ə|i|ö|ü)]"
result = re.findall(pattern, myString)
print(result)`,
    run: text => pyList(findall("[^(a|ı|o|u|e|ə|i|ö|ü)]", "gu", text)),
  },
  {
    id: "task3",
    title: "Number at the end of a string",
    description: "Create a Python program which checks for a number at the end of a given string.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`.*[0-9]$`,
    input: "abcdef\nabcdef6",
    inputHint: "One string per line",
    code: String.raw`def end_str(string, text):
    if text.match(string):
        return True
    else:
        return False

print(end_str('abcdef', re.compile(r".*[0-9]$")))
print(end_str('abcdef6', re.compile(r".*[0-9]$")))`,
    run: text => text.split("\n").map(s => /^.*[0-9]$/u.test(s) ? "True" : "False").join("\n"),
  },
  {
    id: "task4",
    title: "Word with optional ? or !",
    description: "Create a Python program which matches a word at the end of string, with optional question mark and exclamation point.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`[?!]\b\w+`,
    input: "!elnur? ddzsSikkhmji",
    code: String.raw`myString="!elnur? ddzsSikkhmji"

pattern=r"[?!]\b\w+"

result1 = re.findall(pattern, myString)
print(result1)`,
    run: text => pyList(findall(`[?!]${B}${W}+`, "gu", text)),
  },
  {
    id: "task5",
    title: "Swap whitespace and tab",
    description: "Create a Python program which replaces whitespaces with a tab and vice versa.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`\s`,
    input: "!elnur? ddzsSikkhmji",
    code: String.raw`result2=re.sub("\s", "  ", myString)
print(result2)
result3=result2.replace ("  ", " ")
print(result3)`,
    run: text => {
      const r2 = text.replace(/\s/gu, "  ");
      const r3 = r2.split("  ").join(" ");
      return r2 + "\n" + r3;
    },
  },
  {
    id: "task6",
    title: "Words starting with 'ə' or 'ü'",
    description: "Create a Python program which finds all words starting with 'ə' or 'ü' in a given string.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`\b[aü]\w+`,
    input: "Lorem, ipsum dolor üit amet consectetur adipisicing elit. üodi totam odit voluptatibus üxercitationem ab, reiciendis aoluptas! Eveniet porro ratione, araesentium beatae un?de, soluta, tempora commodi illum sit doloribus optio nobis.?",
    note: "The solution uses [aü] instead of [əü].",
    code: String.raw`myString_large="Lorem, ipsum dolor üit amet consectetur adipisicing elit. üodi totam odit voluptatibus üxercitationem ab, reiciendis aoluptas! Eveniet porro ratione, araesentium beatae un?de, soluta, tempora commodi illum sit doloribus optio nobis.?"
pattern_for_large = r"\b[aü]\w+"
result_large = re.findall(pattern_for_large, myString_large)
print(result_large)`,
    run: text => pyList(findall(`${B}[aü]${W}+`, "gu", text)),
  },
  {
    id: "task7",
    title: "Remove all whitespace",
    description: "Create a Python program which removes all whitespaces from a string.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`\s`,
    input: "Lorem, ipsum dolor üit amet consectetur adipisicing elit.",
    code: String.raw`print(re.sub("\s", "", myString_large))`,
    run: text => text.replace(/\s/gu, ""),
  },
  {
    id: "task8",
    title: "Words longer than 4 characters",
    description: "Create a Python program which finds all words which have more than 4 characters in a string.",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`[a-zA-Z]{4}\w+`,
    input: "Lorem, ipsum dolor üit amet consectetur adipisicing elit. üodi totam odit voluptatibus üxercitationem ab, reiciendis aoluptas! Eveniet porro ratione, araesentium beatae un?de, soluta, tempora commodi illum sit doloribus optio nobis.?",
    code: String.raw`print(re.findall("[a-zA-Z]{4}\w+", myString_large))`,
    run: text => pyList(findall(`[a-zA-Z]{4}${W}+`, "gu", text)),
  },
  {
    id: "task9",
    title: "Space before capital letters",
    description: "Create a Python program which inserts spaces between words starting with capital letters.\nOriginal string: PythonProgrammingLanguage\nExpected output: Python Programming Language",
    file: "examples/tasks/task3,4,5,6,7.py",
    pattern: String.raw`(\w)([A-Z])`,
    input: "AsssSDFGHsxsJKsxxzdHSJ",
    code: String.raw`pattern_capital_letter=r"(\w)([A-Z])"
str = "AsssSDFGHsxsJKsxxzdHSJ"
result_capital_letter=re.sub(pattern_capital_letter, r"\1 \2", str)
print(result_capital_letter)`,
    run: text => text.replace(new RegExp(`(${W})([A-Z])`, "gu"), "$1 $2"),
  },
];

const CASES = [
  {
    id: "case1",
    title: "Names and ages to dictionary",
    description: "Create a regex that can select names and ages from the given list and create a new dictionary with name as a key and age as a value.",
    file: "examples/cases/case1.py",
    pattern: String.raw`[A-Z]\w+  ·  [0-9]\w+`,
    input: "Janice is 22 and Theon is 33 Gabriel is 44 and Joey is 21",
    code: String.raw`import re
Nameage = "\
Janice is 22 and Theon is 33 \
Gabriel is 44 and Joey is 21\
"
names=re.findall("[A-Z]\w+", Nameage)
ages=re.findall("[0-9]\w+", Nameage)
dictionary=dict(zip(names,ages))
print(dictionary)`,
    run: text => {
      const names = findall(`[A-Z]${W}+`, "gu", text);
      const ages = findall(`[0-9]${W}+`, "gu", text);
      return pyDict(names, ages);
    },
  },
  {
    id: "case2",
    title: "Email verification",
    description: "Create a regex for email verification. All e-mail addresses should include:\na) 3 to 10 lowercase or uppercase letters, numbers\nb) An @ symbol\nc) 2 to 10 lowercase and uppercase letters, numbers\nd) .\ne) 2 to 4 lowercase and uppercase letters\nExample: meow@gmail.com is a right mail but Hello.com, MrMu@.com are not.",
    file: "examples/cases/case2.py",
    pattern: String.raw`^[a-zA-Z0-9]{3,10}\w+[@]+[a-zA-Z0-9]{2,10}\w+[.]\w[a-z]{2,3}$`,
    input: "meow@gmail.com\nHello.com\nMrMu@.com",
    inputHint: "One email per line",
    code: String.raw`import re
regex = '^[a-zA-Z0-9]{3,10}\w+[@]+[a-zA-Z0-9]{2,10}\w+[.]\w[a-z]{2,3}$'
def check(email):
    if(re.search(regex,email)):
        print("Valid Email")
    else:
        print("Invalid Email")
check(input("Enter your email adress:"))`,
    run: text => {
      const re = new RegExp(`^[a-zA-Z0-9]{3,10}${W}+[@]+[a-zA-Z0-9]{2,10}${W}+[.]${W}[a-z]{2,3}$`, "u");
      return text.split("\n").map(s => re.test(s) ? "Valid Email" : "Invalid Email").join("\n");
    },
  },
  {
    id: "case3",
    title: "Phone number verification",
    description: "Create a regex for number verification. The structure should be: ( · 3 numbers · ) · space · numbers · - · numbers\nExample: (257) 563-7401, (111) 222-3333 are right numbers; (1) 19-39, +994 012-13-32 are not.",
    file: "examples/cases/case3.py",
    pattern: String.raw`^\(\d{3}\)\s\d{3}-\d{4}`,
    input: "(257) 563-7401\n(111) 222-3333\n(1) 19-39\n+994 012-13-32",
    inputHint: "One number per line",
    code: String.raw`import re
regex = '^\(\d{3}\)\s\d{3}-\d{4}'
def check(email):
    if(re.search(regex,email)):
        print("Valid numbers")
    else:
        print("Invalid numbers")
        check(input("Enter your numbers:"))
check(input("Enter your numbers:"))`,
    run: text => text.split("\n").map(s => /^\(\d{3}\)\s\d{3}-\d{4}/u.test(s) ? "Valid numbers" : "Invalid numbers").join("\n"),
  },
];
