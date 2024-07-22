import ResponseButtons from '../../components/ResponseButtons';
import PageNavigations from "../../components/PageNavigations";

const InstructionsPage1 = ({ nextStep, previousStep, answers }) => {

  const handleResponse = (response) => {
    nextStep();
  }

  const mobilityAid = answers.mobilityAid.toLowerCase();

  return (
    <div className="mx-auto text-left flex flex-col items-center"
    style={{ marginBottom: '1.2vw', fontSize: '1em', lineHeight: '1.3',  maxWidth: '60vw' }}
    >
      <div className="flex flex-col items-start"
      style={{ textAlign: 'left', marginBottom: '1.2vw', fontSize: '0.7em', lineHeight: '1.3',  maxWidth: '60vw' }}
      > 
      <p className="mb-4">
        In this section, we will show you <b>images of potential sidewalk barriers.</b> Imagine yourself <b>encountering these situations in real life</b>. Would you be able to pass by the barrier?
        </p>
      <p className="mb-4">
        There are no right or wrong answers—we are interested in your personal perceptions and experiences.
      </p>
      <p className="mb-4">
        Here’s an example. When using your {mobilityAid}, are you <b>confident in passing</b> this barrier? Please focus on the red dot when evaluating images in this survey.
      </p>
      </div>
      <div className="mb-4 flex flex-col items-center">
      <div className="flex m-8 overflow-hidden rounded-lg">
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
