This curriculum for understanding modern AI in 2025 is based on the list Ilya Sutskever gave John Carmack with updates and improvements for scaling and multimodality, inter alia.

[[Original list](https://github.com/dzyim/ilya-sutskever-recommended-reading)]

---

### **A Curriculum for Understanding Modern AI**

This list takes you from the theoretical underpinnings of machine learning to the architectures and techniques that power today's most advanced AI systems.

#### **Part 1: Foundational Concepts & Timeless Theory**

*Before diving into specific models, it’s crucial to understand the principles of complexity, information, and learning that guide the entire field.*

1.  **Kolmogorov Complexity and Algorithmic Randomness.** A.Shen, V. A. Uspensky, and N. Vereshchagin. [[Book](https://bookstore.ams.org/mmono-218/)]
2.  **A Tutorial Introduction to the Minimum Description Length Principle.** Peter Grunwald. [[ArXiv](https://arxiv.org/abs/math/0406077)] [[pdf](https://arxiv.org/pdf/math/0406077.pdf)]
3.  **Keeping Neural Networks Simple by Minimizing the Description Length of the Weights.** Geoffrey E. Hinton and Drew van Camp. [[Paper](https://www.cs.toronto.edu/~hinton/absps/JCN.pdf)] [[pdf](https://www.cs.toronto.edu/~hinton/absps/JCN.pdf)]
4.  **The First Law of Complexodynamics.** Scott Aaronson. [[Blog](https://scottaaronson.blog/?p=514)]
5.  **Quantifying the Rise and Fall of Complexity in Closed Systems: The Coffee Automaton.** Scott Aaronson, et al. [[ArXiv](https://arxiv.org/abs/1705.09319)] [[pdf](https://arxiv.org/pdf/1705.09319.pdf)]
6.  **Machine Super Intelligence.** Shane Legg. [[pdf](http://www.vetta.org/documents/legg-phd.pdf)]

#### **Part 2: The Deep Learning "Big Bang" — CNNs & RNNs**

*This is where deep learning becomes practical and begins to solve real-world problems in vision and language, setting the stage for everything to come.*

7.  **ImageNet Classification with Deep Convolutional Neural Networks.** Alex Krizhevsky, et al. [[Paper](https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)] [[pdf](https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf)]
8.  **CS231n: Convolutional Neural Networks for Visual Recognition.** [[Course](http://cs231n.stanford.edu/)]
9.  **Deep Residual Learning for Image Recognition.** Kaiming He, et al. [[ArXiv](https://arxiv.org/abs/1512.03385)] [[pdf](https://arxiv.org/pdf/1512.03385.pdf)]
10. **Identity Mappings in Deep Residual Networks.** Kaiming He, et al. [[ArXiv](https://arxiv.org/abs/1603.05027)] [[pdf](https://arxiv.org/pdf/1603.05027.pdf)]
11. **Multi-Scale Context Aggregation by Dilated Convolutions.** Fisher Yu and Vladlen Koltun. [[ArXiv](https://arxiv.org/abs/1511.07122)] [[pdf](https://arxiv.org/pdf/1511.07122.pdf)]
12. **The Unreasonable Effectiveness of Recurrent Neural Networks.** Andrej Karpathy. [[Blog](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)] [[Code](https://github.com/karpathy/char-rnn)]
13. **Understanding LSTM Networks.** Christopher Olah. [[Blog](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)]
14. **Recurrent Neural Network Regularization.** Wojciech Zaremba, et al. [[ArXiv](https://arxiv.org/abs/1409.2329)] [[pdf](https://arxiv.org/pdf/1409.2329.pdf)] [[Code](https://github.com/wojciechz/rnn_regularization)]
15. **Deep Speech 2: End-to-End Speech Recognition in English and Mandarin.** Dario Amodei, et al. [[ArXiv](https://arxiv.org/abs/1512.02595)] [[pdf](https://arxiv.org/pdf/1512.02595.pdf)]
16. **Neural Turing Machines.** Alex Graves, et al. [[ArXiv](https://arxiv.org/abs/1410.5401)] [[pdf](https://arxiv.org/pdf/1410.5401.pdf)]
17. **A simple neural network module for relational reasoning.** Adam Santoro, et al. [[ArXiv](https://arxiv.org/abs/1706.01427)] [[pdf](https://arxiv.org/pdf/1706.01427.pdf)]
18. **Relational recurrent neural networks.** Adam Santoro, et al. [[ArXiv](https://arxiv.org/abs/1806.01822)] [[pdf](https://arxiv.org/pdf/1806.01822.pdf)]
19. **Pointer Networks.** Oriol Vinyals, et al. [[Paper](https://arxiv.org/abs/1506.03134)] [[pdf](https://arxiv.org/pdf/1506.03134.pdf)]
20. **Neural Machine Translation by Jointly Learning to Align and Translate.** Dzmitry Bahdanau, et al. [[ArXiv](https://arxiv.org/abs/1409.0473)] [[pdf](https://arxiv.org/pdf/1409.0473.pdf)]

#### **Part 3: The Transformer Revolution**

*The invention of a new architecture that discards recurrence and convolution entirely in favor of self-attention. This is the foundation of almost all modern large-scale models.*

21. **Attention Is All You Need.** Ashish Vaswani, et al. [[ArXiv](https://arxiv.org/abs/1706.03762)] [[pdf](https://arxiv.org/pdf/1706.03762.pdf)]
22. **The Annotated Transformer.** Sasha Rush, et al. [[Blog](http://nlp.seas.harvard.edu/2018/04/03/attention.html)] [[Code](https://github.com/harvardnlp/annotated-transformer)]
23. **Order Matters: Sequence to sequence for sets.** Oriol Vinyals, et al. [[ArXiv](https://arxiv.org/abs/1811.10730)] [[pdf](https://arxiv.org/pdf/1811.10730.pdf)]
24. **Neural Message Passing for Quantum Chemistry.** Justin Gilmer, et al. [[ArXiv](https://arxiv.org/abs/1704.01212)] [[pdf](https://arxiv.org/pdf/1704.01212.pdf)]

#### **Part 4: The Scaling Era — Pre-training & Emergence**

*Once the Transformer was established, the paradigm shifted to pre-training a single, enormous model on web-scale data and then adapting it. This led to the discovery of emergent, unexpected capabilities.*

25. **BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.** Jacob Devlin, et al. [[ArXiv](https://arxiv.org/abs/1810.04805)] [[pdf](https://arxiv.org/pdf/1810.04805.pdf)]
26. **Language Models are Unsupervised Multitask Learners.** Alec Radford, Jeffrey Wu, et al. (GPT-2). [[Paper](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)]
27. **Language Models are Few-Shot Learners.** Tom B. Brown, et al. (GPT-3). [[ArXiv](https://arxiv.org/abs/2005.14165)] [[pdf](https://arxiv.org/pdf/2005.14165.pdf)]
28. **Scaling Laws for Neural Language Models.** Jared Kaplan, et al. [[ArXiv](https://arxiv.org/abs/2001.08361)] [[pdf](https://arxiv.org/pdf/2001.08361.pdf)]

#### **Part 5: Generative AI & Multimodality**

*Applying the lessons from scaling to domains beyond text, leading to a cambrian explosion in high-fidelity image, audio, and video generation.*

29. **Learning Transferable Visual Models From Natural Language Supervision.** Alec Radford, et al. (CLIP). [[ArXiv](https://arxiv.org/abs/2103.00020)] [[pdf](https://arxiv.org/pdf/2103.00020.pdf)]
30. **Denoising Diffusion Probabilistic Models (DDPM).** Jonathan Ho, et al. [[ArXiv](https://arxiv.org/abs/2006.11239)] [[pdf](https://arxiv.org/pdf/2006.11239.pdf)]
31. **High-Resolution Image Synthesis with Latent Diffusion Models.** Robin Rombach, et al. (Stable Diffusion). [[ArXiv](https://arxiv.org/abs/2112.10752)] [[pdf](https://arxiv.org/pdf/2112.10752.pdf)]
32. **Variational Lossy Autoencoder.** Xi Chen, et al. [[ArXiv](https://arxiv.org/abs/1611.02731)] [[pdf](https://arxiv.org/pdf/1611.02731.pdf)]

#### **Part 6: Alignment — Making Models Safe & Useful**

*A raw, scaled model is not a useful product. Alignment is the process of fine-tuning models to follow human instructions, be helpful, and act safely.*

33. **Training language models to follow instructions with human feedback.** Long Ouyang, et al. (InstructGPT). [[ArXiv](https://arxiv.org/abs/2203.02155)] [[pdf](https://arxiv.org/pdf/2203.02155.pdf)]

#### **Part 7: Modern Architectures & Efficiency**

*The cutting edge. As models get ever larger, research is focused on making them more efficient to train and serve, and exploring what architectures might one day succeed the Transformer.*

34. **GPipe: Easy Scaling with Micro-Batch Pipeline Parallelism.** Yanping Huang, et al. [[ArXiv](https://arxiv.org/abs/1811.06965)] [[pdf](https://arxiv.org/pdf/1811.06965.pdf)]
35. **Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer.** Noam Shazeer, et al. [[ArXiv](https://arxiv.org/abs/1701.06538)] [[pdf](https://arxiv.org/pdf/1701.06538.pdf)]
36. **FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness.** Tri Dao, et al. [[ArXiv](https://arxiv.org/abs/2205.14135)] [[pdf](https://arxiv.org/pdf/2205.14135.pdf)]
37. **Mamba: Linear-Time Sequence Modeling with Selective State Spaces.** Albert Gu and Tri Dao. [[ArXiv](https://arxiv.org/abs/2312.00752)] [[pdf](https://arxiv.org/pdf/2312.00752.pdf)]
