import ResponseButtons from '../../components/ResponseButtons';
import PageNavigations from "../../components/PageNavigations";

const InstructionsPage1 = ({ nextStep, previousStep, answers }) => {

  const handleResponse = (response) => {
    nextStep();
  }

  const mobilityAid = answers.mobilityAid.toLowerCase();

  return (
    <div className="max-w-6xl mx-auto p-8 text-left text-xl flex flex-col items-center">
      {/* <h2 className="text-3xl font-semibold mb-4">Instructions</h2> */}
      <div className="flex flex-col items-start"> 
      <p className="mb-4">
        In this section, we will show you <b>images of potential sidewalk barriers.</b> Imagine yourself <b>encountering these situations in real life</b>. Would you be able to pass by the barrier?
        </p>
      <p className="mb-4">
        There are no right or wrong answers—we are interested in your personal perceptions and experiences.
      </p>
      <p className="mb-4">
        Here’s an example. When using your {mobilityAid}, can you <b>comfortably pass</b> this barrier? Please focus on the red dot.
      </p>
      </div>
      <div className="mb-4 flex flex-col items-center  ">
      <div className="selection-image-wrapper">
        <img src={`${process.env.PUBLIC_URL}/img/example-barrier.png`} alt="Example Barrier" />
      </div>
      <ResponseButtons
                        gap="12px"
                        buttons={[
                            { text: 'No', shortcut: 'N', onClick: () => handleResponse('no') },
                            { text: 'Unsure', shortcut: 'U', onClick: () => handleResponse('unsure'), variant: 'outlined' },
                            { text: 'Yes', shortcut: 'Y', onClick: () => handleResponse('yes') }
                        ]}
                    />
    </div>
    <PageNavigations onPrevious={previousStep} onNext={nextStep} /> 
    </div>
  );
};

export default InstructionsPage1;
