import React, { useState } from 'react';
import InterviewForm from '../InterviewForm';
// import { ReactMediaRecorder } from 'react-media-recorder';

function Home() {
  const totalQuestions = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [qaPairs, setQaPairs] = useState([]); // {question, answer}
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [summaryFeedback, setSummaryFeedback] = useState('');

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [mediaType, setMediaType] = useState('text'); // 'text', 'audio', or 'video'
  const [mediaBlobUrl, setMediaBlobUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [transcript, setTranscript] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const API_BASE = 'http://localhost:5001/api';

  const handleStartInterview = async (formDataInput) => {
    setFormData(formDataInput);
    setCurrentStep(1);
    setQaPairs([]);
    setInterviewComplete(false);
    setSummaryFeedback('');
    setLoading(true);
    setError('');
    setQuestion('');
    setVideoUrl('');
    setUserAnswer('');
    setAnswerSubmitted(false);
    setMediaBlobUrl('');
    setMediaType('text');
    setFeedback('');
    setTranscript('');
    setFeedbackLoading(false);
    // Generate the first question
    const prompt = `You're an interviewer for ${formDataInput.company}. Ask a technical interview question for a ${formDataInput.role} skilled in ${formDataInput.skills}.`;
    try {
      const response = await fetch(`${API_BASE}/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful technical interviewer.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 150,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const questionText = data.choices[0].message.content.trim();
        setQuestion(questionText);
        // D-ID API call
        setVideoLoading(true);
        const didResponse = await fetch(`${API_BASE}/did`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            script: {
              type: 'text',
              input: questionText,
              provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' }
            },
            source_url: 'https://create-images-results.d-id.com/DefaultMale.png'
          }),
        });
        const didData = await didResponse.json();
        if (didData && didData.result_url) {
          setVideoUrl(didData.result_url);
        } else {
          setError('Failed to generate video.');
        }
        setVideoLoading(false);
      } else {
        setError('Failed to generate question.');
      }
    } catch (err) {
      setError('Error contacting OpenAI or D-ID API.');
      setVideoLoading(false);
    }
    setLoading(false);
  };

  const getFeedback = async (answerText) => {
    setFeedbackLoading(true);
    setFeedback('');
    try {
      const prompt = `Evaluate this interview answer for the following question: "${question}"
Student's answer: "${answerText}"
Give feedback on confidence, explanation, and missing examples. Be specific about what is lacking.`;
      const response = await fetch(`${API_BASE}/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful technical interviewer.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 200,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setFeedback(data.choices[0].message.content.trim());
      } else {
        setFeedback('Failed to generate feedback.');
      }
    } catch (err) {
      setFeedback('Error contacting OpenAI for feedback.');
    }
    setFeedbackLoading(false);
  };

  const getNextQuestion = async (prevAnswer) => {
    setLoading(true);
    setError('');
    setQuestion('');
    setVideoUrl('');
    setUserAnswer('');
    setAnswerSubmitted(false);
    setMediaBlobUrl('');
    setMediaType('text');
    setFeedback('');
    setTranscript('');
    setFeedbackLoading(false);
    // Generate the next question based on previous answer
    const prompt = `You're an interviewer for ${formData.company}. Ask a follow-up technical interview question for a ${formData.role} skilled in ${formData.skills}, based on this previous answer: "${prevAnswer}".`;
    try {
      const response = await fetch(`${API_BASE}/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful technical interviewer.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 150,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const questionText = data.choices[0].message.content.trim();
        setQuestion(questionText);
        // D-ID API call
        setVideoLoading(true);
        const didResponse = await fetch(`${API_BASE}/did`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            script: {
              type: 'text',
              input: questionText,
              provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' }
            },
            source_url: 'https://create-images-results.d-id.com/DefaultMale.png'
          }),
        });
        const didData = await didResponse.json();
        if (didData && didData.result_url) {
          setVideoUrl(didData.result_url);
        } else {
          setError('Failed to generate video.');
        }
        setVideoLoading(false);
      } else {
        setError('Failed to generate question.');
      }
    } catch (err) {
      setError('Error contacting OpenAI or D-ID API.');
      setVideoLoading(false);
    }
    setLoading(false);
  };

  const getSummaryFeedback = async (qaPairs) => {
    setSummaryFeedback('');
    setLoading(true);
    let qaText = qaPairs.map((qa, idx) => `Q${idx + 1}: ${qa.question}\nA${idx + 1}: ${qa.answer}`).join('\n');
    const prompt = `You are an expert interviewer. Here are the questions and answers from a mock interview.\n${qaText}\n\nGive a summary of the student's performance, highlighting strengths and specific areas to improve.`;
    try {
      const response = await fetch(`${API_BASE}/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful technical interviewer.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 400,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setSummaryFeedback(data.choices[0].message.content.trim());
      } else {
        setSummaryFeedback('Failed to generate summary feedback.');
      }
    } catch (err) {
      setSummaryFeedback('Error contacting OpenAI for summary feedback.');
    }
    setLoading(false);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setAnswerSubmitted(true);
    let answerText = '';
    if (mediaType === 'text') {
      answerText = userAnswer;
      await getFeedback(answerText);
    }
    // For audio/video, prompt for transcript
  };

  const handleTranscriptSubmit = async (e) => {
    e.preventDefault();
    setAnswerSubmitted(true);
    let answerText = transcript;
    await getFeedback(answerText);
  };

  // After feedback is shown, go to next question or finish
  const handleNext = async () => {
    // Store Q&A
    let answerText = mediaType === 'text' ? userAnswer : transcript;
    const newQaPairs = [...qaPairs, { question, answer: answerText }];
    setQaPairs(newQaPairs);
    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
      await getNextQuestion(answerText);
    } else {
      setInterviewComplete(true);
      await getSummaryFeedback(newQaPairs);
    }
    // Reset answer state
    setUserAnswer('');
    setAnswerSubmitted(false);
    setMediaBlobUrl('');
    setMediaType('text');
    setFeedback('');
    setTranscript('');
    setFeedbackLoading(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-8">AI Interview Simulator</h1>
      {!formData && <InterviewForm onStart={handleStartInterview} />}
      {loading && <div className="text-center mt-6">Generating question...</div>}
      {error && <div className="text-red-600 text-center mt-6">{error}</div>}
      {!interviewComplete && formData && question && !videoUrl && !videoLoading && (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Interview Question {currentStep} of {totalQuestions}:</h2>
          <p>{question}</p>
        </div>
      )}
      {!interviewComplete && videoLoading && <div className="text-center mt-6">Generating video...</div>}
      {!interviewComplete && videoUrl && (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Interviewer Video (Question {currentStep} of {totalQuestions}):</h2>
          <video src={videoUrl} controls autoPlay className="w-full rounded" />
          {!answerSubmitted ? (
            <div className="mt-6">
              <div className="mb-4 flex gap-4">
                <button
                  className={`px-4 py-2 rounded ${mediaType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setMediaType('text')}
                  type="button"
                >
                  Text
                </button>
                <button
                  className={`px-4 py-2 rounded ${mediaType === 'audio' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setMediaType('audio')}
                  type="button"
                >
                  Audio
                </button>
                <button
                  className={`px-4 py-2 rounded ${mediaType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setMediaType('video')}
                  type="button"
                >
                  Video
                </button>
              </div>
              {mediaType === 'text' && (
                <form onSubmit={handleAnswerSubmit}>
                  <label className="block mb-2 font-medium">Your Answer:</label>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows={4}
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit Answer</button>
                </form>
              )}
              {mediaType === 'audio' && (
                <ReactMediaRecorder
                  audio
                  render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                      <p className="mb-2">Status: {status}</p>
                      <button onClick={startRecording} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Start Recording</button>
                      <button onClick={stopRecording} className="bg-red-600 text-white px-3 py-1 rounded">Stop Recording</button>
                      {mediaBlobUrl && (
                        <div className="mt-4">
                          <audio src={mediaBlobUrl} controls className="w-full" />
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
                            onClick={() => {
                              setMediaBlobUrl(mediaBlobUrl);
                              setAnswerSubmitted(true);
                            }}
                          >
                            Submit Audio Answer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                />
              )}
              {mediaType === 'video' && (
                <ReactMediaRecorder
                  video
                  render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                      <p className="mb-2">Status: {status}</p>
                      <button onClick={startRecording} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Start Recording</button>
                      <button onClick={stopRecording} className="bg-red-600 text-white px-3 py-1 rounded">Stop Recording</button>
                      {mediaBlobUrl && (
                        <div className="mt-4">
                          <video src={mediaBlobUrl} controls className="w-full rounded" />
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
                            onClick={() => {
                              setMediaBlobUrl(mediaBlobUrl);
                              setAnswerSubmitted(true);
                            }}
                          >
                            Submit Video Answer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
          ) : (
            <div className="mt-4 text-green-700 font-semibold">
              Answer submitted!
              {mediaType !== 'text' && !feedback && (
                <form onSubmit={handleTranscriptSubmit} className="mt-4">
                  <label className="block mb-2 font-medium">Please provide a transcript of your answer for feedback:</label>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows={4}
                    value={transcript}
                    onChange={e => setTranscript(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit Transcript for Feedback</button>
                </form>
              )}
              {feedbackLoading && <div className="mt-4 text-blue-600">Generating feedback...</div>}
              {feedback && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                  <h3 className="font-semibold mb-2">AI Feedback:</h3>
                  <div>{feedback}</div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
                    onClick={handleNext}
                  >
                    {currentStep < totalQuestions ? 'Next Question' : 'Finish Interview'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {interviewComplete && (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Interview Complete!</h2>
          <h3 className="text-lg font-semibold mb-2">Summary Feedback:</h3>
          {loading && <div className="text-center mt-6">Generating summary feedback...</div>}
          <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-line">{summaryFeedback}</div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-6 hover:bg-blue-700 transition block mx-auto"
            onClick={() => {
              setFormData(null);
              setCurrentStep(1);
              setQaPairs([]);
              setInterviewComplete(false);
              setSummaryFeedback('');
              setQuestion('');
              setVideoUrl('');
              setUserAnswer('');
              setAnswerSubmitted(false);
              setMediaBlobUrl('');
              setMediaType('text');
              setFeedback('');
              setTranscript('');
              setFeedbackLoading(false);
            }}
          >
            Restart Interview
          </button>
        </div>
      )}
    </>
  );
}

export default Home;