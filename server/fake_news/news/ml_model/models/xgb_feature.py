import pickle as pkl

import xgboost as xgb
from scipy.sparse import hstack, vstack, csr_matrix
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.decomposition import NMF, TruncatedSVD
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize


class XGBoostVectorizer(BaseEstimator, TransformerMixin):

    def __init__(self):

        self.modelPath = 'news/ml_model/vectorizer_model'

        self.countVectorizer = pkl.load(
            open(self.modelPath + '/count_vectorizer_model.pkl', 'rb')
        )
        self.tfidfVectorizer = pkl.load(
            open(self.modelPath + '/tfidf_vectorizer_model.pkl', 'rb')
        )
        self.SVDVectorizer = pkl.load(
            open(self.modelPath + '/svd_100_vectorizer_model.pkl', 'rb')
        )  # 파일 교체해야함
        self.NMFVectorizer = pkl.load(
            open(self.modelPath + '/nmf_200_vectorizer_model.pkl', 'rb')
        )

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        """
            pretrain된 모델이나 새롭게 fit한 feature engineering 모델을 이용해
            input을 vectorizing 하는 메소드

        :param X: [[head sentence, body sentence], [head2, body2], ..., [headN, bodyN]] 형식의 2차원 리스트

        :return: 모든 feature들을 concat한 csr matrix

        countVector head + body : (n, 892076)
        tfidfVector head + body + cos : (n, 892077)
        SVDVector 100 head + body + cos : (n, 201)
        NMFVector 200 head + body + cos : (n, 401)
        pre-trained model data input shape : (n, 3568907)

        새로 fit한 경우는 다른 shape가 입력
        """

        def cos_sim(head, body):
            head, body = csr_matrix(head), csr_matrix(body)
            cos_sim_data = []
            for i in range(head.shape[0]):
                cos_sim_data.append(
                    cosine_similarity(head.getrow(i), body.getrow(i))[0]
                )
            return csr_matrix(cos_sim_data)

        head = [x[0] for x in X]
        body = [x[1] for x in X]
        if self.countVectorizer is None:
            self.countVectorizer = pkl.load(
                open(self.modelPath + '/count_vectorizer_model.pkl', 'rb')
            )
            self.tfidfVectorizer = pkl.load(
                open(self.modelPath + '/tfidf_vectorizer_model.pkl', 'rb')
            )
            self.SVDVectorizer = pkl.load(
                open(self.modelPath + '/svd_100_vectorizer_model.pkl', 'rb')
            ) #파일 교체해야함
            self.NMFVectorizer = pkl.load(
                open(self.modelPath + '/nmf_200_vectorizer_model.pkl', 'rb')
            )

        count_h_vec = self.countVectorizer.transform(head)
        count_b_vec = self.countVectorizer.transform(body)

        tfidf_h_vec = self.tfidfVectorizer.transform(head)
        tfidf_b_vec = self.tfidfVectorizer.transform(body)
        tfidf_cos_vec = cos_sim(tfidf_h_vec, tfidf_b_vec)

        svd_h_vec = self.SVDVectorizer.transform(tfidf_h_vec)
        svd_b_vec = self.SVDVectorizer.transform(tfidf_b_vec)
        svd_cos_vec = cos_sim(svd_h_vec, svd_b_vec)

        nmf_h_vec = self.NMFVectorizer.transform(tfidf_h_vec)
        nmf_b_vec = self.NMFVectorizer.transform(tfidf_b_vec)
        nmf_cos_vec = cos_sim(nmf_h_vec, nmf_b_vec)

        return xgb.DMatrix(normalize(hstack(
            (
                count_h_vec,
                count_b_vec,
                tfidf_h_vec,
                tfidf_b_vec,
                tfidf_cos_vec,
                svd_h_vec,
                svd_b_vec,
                svd_cos_vec,
                nmf_h_vec,
                nmf_b_vec,
                nmf_cos_vec
            ),
            format='csr'
        )))
