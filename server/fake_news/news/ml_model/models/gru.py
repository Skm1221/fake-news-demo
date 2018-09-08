from sklearn.base import BaseEstimator, TransformerMixin
import numpy as np
import tensorflow as tf


class GRULime(BaseEstimator, TransformerMixin):

    def __init__(self, model):
        self.model = model
        self.graph = tf.get_default_graph()

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        with self.graph.as_default():
            return self.model.predict(np.array(X))
