/// <reference types="node" />
/// <reference types="request" />
/*************************
 * interfaces
 ************************/
declare namespace ToneAnalyzerV3 {
  /** Options for the `ToneAnalyzerV3` constructor. **/
  type Options = {
    version_date: string
    url?: string
    username?: string
    password?: string
    use_unauthenticated?: boolean
    headers?: object
  }
  /** The callback for a service request. **/
  type Callback<T> = (error: any, body?: T, response?: any) => void
  /** The body of a service request that returns no response data. **/
  interface Empty {}
  /*************************
   * request interfaces
   ************************/
  /** Parameters for the `tone` operation. **/
  interface ToneParams {
    /** JSON, plain text, or HTML input that contains the content to be analyzed. For JSON input, provide an object of type `ToneInput`. **/
    tone_input: ToneInput | string
    /** The type of the input: application/json, text/plain, or text/html. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. **/
    content_type: ToneConstants.ContentType | string
    /** Indicates whether the service is to return an analysis of each individual sentence in addition to its analysis of the full document. If `true` (the default), the service returns results for each sentence. **/
    sentences?: boolean
    /** **`2017-09-21`:** Deprecated. The service continues to accept the parameter for backward-compatibility, but the parameter no longer affects the response.   **`2016-05-19`:** A comma-separated list of tones for which the service is to return its analysis of the input; the indicated tones apply both to the full document and to individual sentences of the document. You can specify one or more of the valid values. Omit the parameter to request results for all three tones. **/
    tones?: string[]
    /** The language of the input text for the request: English or French. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified language. Do not submit content that contains both languages. You can specify any combination of languages for `content_language` and `Accept-Language`. * **`2017-09-21`:** Accepts `en` or `fr`. * **`2016-05-19`:** Accepts only `en`. **/
    content_language?: ToneConstants.ContentLanguage | string
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for `Content-Language` and `accept_language`. **/
    accept_language?: ToneConstants.AcceptLanguage | string
  }
  /** Constants for the `tone` operation. **/
  namespace ToneConstants {
    /** The type of the input: application/json, text/plain, or text/html. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. **/
    enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_PLAIN = 'text/plain',
      TEXT_HTML = 'text/html'
    }
    /** The language of the input text for the request: English or French. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified language. Do not submit content that contains both languages. You can specify any combination of languages for `content_language` and `Accept-Language`. * **`2017-09-21`:** Accepts `en` or `fr`. * **`2016-05-19`:** Accepts only `en`. **/
    enum ContentLanguage {
      EN = 'en',
      FR = 'fr'
    }
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for `Content-Language` and `accept_language`. **/
    enum AcceptLanguage {
      AR = 'ar',
      DE = 'de',
      EN = 'en',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw'
    }
  }
  /** Parameters for the `toneChat` operation. **/
  interface ToneChatParams {
    /** An array of `Utterance` objects that provides the input content that the service is to analyze. **/
    utterances: Utterance[]
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. **/
    accept_language?: ToneChatConstants.AcceptLanguage | string
  }
  /** Constants for the `toneChat` operation. **/
  namespace ToneChatConstants {
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. **/
    enum AcceptLanguage {
      AR = 'ar',
      DE = 'de',
      EN = 'en',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw'
    }
  }
  /*************************
   * model interfaces
   ************************/
  /** DocumentAnalysis. **/
  interface DocumentAnalysis {
    /** **`2017-09-21`:** An array of `ToneScore` objects that provides the results of the analysis for each qualifying tone of the document. The array includes results for any tone whose score is at least 0.5. The array is empty if no tone has a score that meets this threshold. **`2016-05-19`:** Not returned. **/
    tones?: ToneScore[]
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** An array of `ToneCategory` objects that provides the results of the tone analysis for the full document of the input content. The service returns results only for the tones specified with the `tones` parameter of the request. **/
    tone_categories?: ToneCategory[]
    /** **`2017-09-21`:** A warning message if the overall content exceeds 128 KB or contains more than 1000 sentences. The service analyzes only the first 1000 sentences for document-level analysis and the first 100 sentences for sentence-level analysis. **`2016-05-19`:** Not returned. **/
    warning?: string
  }
  /** SentenceAnalysis. **/
  interface SentenceAnalysis {
    /** The unique identifier of a sentence of the input content. The first sentence has ID 0, and the ID of each subsequent sentence is incremented by one. **/
    sentence_id: number
    /** The text of the input sentence. **/
    text: string
    /** **`2017-09-21`:** An array of `ToneScore` objects that provides the results of the analysis for each qualifying tone of the sentence. The array includes results for any tone whose score is at least 0.5. The array is empty if no tone has a score that meets this threshold. **`2016-05-19`:** Not returned. **/
    tones?: ToneScore[]
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** An array of `ToneCategory` objects that provides the results of the tone analysis for the sentence. The service returns results only for the tones specified with the `tones` parameter of the request. **/
    tone_categories?: ToneCategory[]
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** The offset of the first character of the sentence in the overall input content. **/
    input_from?: number
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** The offset of the last character of the sentence in the overall input content. **/
    input_to?: number
  }
  /** ToneAnalysis. **/
  interface ToneAnalysis {
    /** An object of type `DocumentAnalysis` that provides the results of the analysis for the full input document. **/
    document_tone: DocumentAnalysis
    /** An array of `SentenceAnalysis` objects that provides the results of the analysis for the individual sentences of the input content. The service returns results only for the first 100 sentences of the input. The field is omitted if the `sentences` parameter of the request is set to `false`. **/
    sentences_tone?: SentenceAnalysis[]
  }
  /** ToneCategory. **/
  interface ToneCategory {
    /** An array of `ToneScore` objects that provides the results for the tones of the category. **/
    tones: ToneScore[]
    /** The unique, non-localized identifier of the category for the results. The service can return results for the following category IDs: `emotion_tone`, `language_tone`, and `social_tone`. **/
    category_id: string
    /** The user-visible, localized name of the category. **/
    category_name: string
  }
  /** ToneChatScore. **/
  interface ToneChatScore {
    /** The score for the tone in the range of 0.5 to 1. A score greater than 0.75 indicates a high likelihood that the tone is perceived in the utterance. **/
    score: number
    /** The unique, non-localized identifier of the tone for the results. The service can return results for the following tone IDs: `sad`, `frustrated`, `satisfied`, `excited`, `polite`, `impolite`, and `sympathetic`. The service returns results only for tones whose scores meet a minimum threshold of 0.5. **/
    tone_id: string
    /** The user-visible, localized name of the tone. **/
    tone_name: string
  }
  /** ToneInput. **/
  interface ToneInput {
    /** The input content that the service is to analyze. **/
    text: string
  }
  /** ToneScore. **/
  interface ToneScore {
    /** The score for the tone. * **`2017-09-21`:** The score that is returned lies in the range of 0.5 to 1. A score greater than 0.75 indicates a high likelihood that the tone is perceived in the content. * **`2016-05-19`:** The score that is returned lies in the range of 0 to 1. A score less than 0.5 indicates that the tone is unlikely to be perceived in the content; a score greater than 0.75 indicates a high likelihood that the tone is perceived. **/
    score: number
    /** The unique, non-localized identifier of the tone. * **`2017-09-21`:** The service can return results for the following tone IDs: `anger`, `fear`, `joy`, and `sadness` (emotional tones); `analytical`, `confident`, and `tentative` (language tones). The service returns results only for tones whose scores meet a minimum threshold of 0.5. * **`2016-05-19`:** The service can return results for the following tone IDs of the different categories: for the `emotion` category: `anger`, `disgust`, `fear`, `joy`, and `sadness`; for the `language` category: `analytical`, `confident`, and `tentative`; for the `social` category: `openness_big5`, `conscientiousness_big5`, `extraversion_big5`, `agreeableness_big5`, and `emotional_range_big5`. The service returns scores for all tones of a category, regardless of their values. **/
    tone_id: string
    /** The user-visible, localized name of the tone. **/
    tone_name: string
  }
  /** Utterance. **/
  interface Utterance {
    /** An utterance contributed by a user in the conversation that is to be analyzed. The utterance can contain multiple sentences. **/
    text: string
    /** A string that identifies the user who contributed the utterance specified by the `text` parameter. **/
    user?: string
  }
  /** UtteranceAnalyses. **/
  interface UtteranceAnalyses {
    /** An array of `UtteranceAnalysis` objects that provides the results for each utterance of the input. **/
    utterances_tone: UtteranceAnalysis[]
    /** **`2017-09-21`:** A warning message if the content contains more than 50 utterances. The service analyzes only the first 50 utterances. **`2016-05-19`:** Not returned. **/
    warning?: string
  }
  /** UtteranceAnalysis. **/
  interface UtteranceAnalysis {
    /** The unique identifier of the utterance. The first utterance has ID 0, and the ID of each subsequent utterance is incremented by one. **/
    utterance_id: string
    /** The text of the utterance. **/
    utterance_text: string
    /** An array of `ToneChatScore` objects that provides results for the most prevalent tones of the utterance. The array includes results for any tone whose score is at least 0.5. The array is empty if no tone has a score that meets this threshold. **/
    tones: ToneChatScore[]
    /** **`2017-09-21`:** An error message if the utterance contains more than 500 characters. The service does not analyze the utterance. **`2016-05-19`:** Not returned. **/
    error?: string
  }
}
