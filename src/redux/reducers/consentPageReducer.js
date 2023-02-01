const initialState = {
  loading: false,
  questions: [],
  message:'',
  getQuestions:[],
  saveAnswersResponse:"",
  saveSignatureImageRespon:""
};

const consentPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_CONSENT_QUESTIONS_REQUEST":
      return { ...state, loading: true };
    case "GET_CONSENT_QUESTIONS_RESPONSE":
      return {
        ...state,
        loading: false,
        questions: payload.questionList ,
      };
    case "GET_CONSENT_QUESTIONS_ERROR":
      return { ...state, loading: true,  };

      case "POST_CONSENT_QUESTIONS_REQUEST":
        return { ...state, loading: true };
      case "POST_CONSENT_QUESTIONS_RESPONSE":
        return {
          ...state,
          loading: false,
          message: payload.message ,
        };
      case "POST_CONSENT_QUESTIONS_ERROR":
        return { ...state, loading: true,  };


        // new consent reducers 
     case "GET_CONSENT_SERVICES_QUESTIONS_REQUEST":
         return {...state, loading:true};
     case "GET_CONSENT_SERVICES_QUESTIONS_RESPONSE":
      return {...state, loading:false, getQuestions: payload}
     case "GET_CONSENT_SERVICES_QUESTIONS_ERROR":
      return {...state, loading:true,}

      case "SAVE_CONSENT_SERVICES_QANSWERS_REQUEST":
        return {...state, loading:true};
    case "SAVE_CONSENT_SERVICES_QANSWERS_RESPONSE":
     return {...state, loading:false, saveAnswersResponse: payload}
    case "SAVE_CONSENT_SERVICES_QANSWERS_ERROR":
     return {...state, loading:true, }

    case "DO_EMPTY_CONSENT_ANSWER_RESPONSE":
     return {...state, loading:false, saveAnswersResponse: {}}
   default:
      return state;
     }
     
};

export default consentPageReducer;
