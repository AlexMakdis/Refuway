import QuestionItem from './QuestionItem';

export default function QuestionsList({questions}) {
  return (
    <>
    <div className="container mx-auto rounded-xl w-4/5 ">
        <div className="my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {questions.map((question) => (
                <QuestionItem question={question} key={question.id}></QuestionItem>
            ))}
        </div>
    </div>
    </>
  );
}