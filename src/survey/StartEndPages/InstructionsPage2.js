import { Button } from "@material-tailwind/react";
import PageNavigations from "../../components/PageNavigations";

const InstructionsPage2 = ({ nextStep , previousStep}) => {

  const handleResponse = (response) => {
    nextStep();
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-left text-xl">
      <p className="mb-4">
        As you evaluate each image, you might consider different ways of maneuvering around a barrier depending on your ability and the perceived problem. So, to consider if something is passable, please think about what you would be capable of doing in real life. For example:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>If you can <b>make it down the curb to the street</b>, then you might consider this a passable barrier</li>
        <li>If you can <b>squeeze by</b> to the left side of the pole, then you might also consider this a passable barrier</li>
        <li>But if you do not think you can comfortably pass this barrier, then you would mark <b>no</b>.</li>
      </ul>
      <div className="mt-12 mb-16">
        <img src={`${process.env.PUBLIC_URL}/img/example-scenarios.png`} alt="Example Barrier" />
      </div>
      <div className="flex justify-end items-center">
        <Button size="lg" color="teal" onClick={handleResponse}>Continue</Button>
        <span className="ml-4 text-teal-700">press Enter ↵</span>
      </div> 
      <PageNavigations onPrevious={previousStep} onNext={nextStep} /> 
      </div>
  );
};

export default InstructionsPage2;
