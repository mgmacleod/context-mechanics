# Cross-Level Information Processing in Complex Systems: From Bell's Neuroscience to AI Architectures

## Abstract

This document presents Tony Bell's theory of cross-level information processing as a fundamental organizing principle of complex systems, extending from its origins in computational neuroscience to broader applications in artificial intelligence and systems theory. Bell's framework proposes that biological systems achieve their remarkable adaptive capabilities through "networks of networks" structures where information flows bidirectionally between organizational levels via emergence and submergence operations. We argue that these principles represent universal features of complex generative systems and provide a theoretical foundation for understanding both biological cognition and artificial intelligence architectures, particularly large language models.

## 1. Introduction

Traditional approaches to understanding complex systems, whether biological or artificial, typically focus on single levels of organization. In neuroscience, researchers might study molecular mechanisms, neural firing patterns, or behavioral outcomes, often treating other levels as either implementation details or emergent consequences. Similarly, in artificial intelligence, analysis often centers on algorithmic properties, training dynamics, or performance metrics in isolation.

Tony Bell, a theoretical neuroscientist at UC Berkeley, has proposed a radically different approach: that the most important dynamics in complex systems occur *between* levels of organization through bidirectional information flows. This cross-level perspective challenges conventional reductionist approaches and offers new insights into how both biological and artificial systems achieve sophisticated adaptive behaviors.

This document establishes Bell's framework as a foundation for analyzing complex information processing systems, with particular attention to its implications for understanding and improving artificial intelligence architectures.

## 2. Bell's Core Theory

### 2.1 The Networks of Networks Structure

Bell argues that biological systems are fundamentally organized as "networks of networks" at every scale:

- Networks of neurons, each composed of
- Networks of synapses, each composed of  
- Networks of macromolecules, each composed of
- Networks of small molecules, each composed of
- Networks of atoms, continuing downward

This hierarchical composition extends upward as well, with neural networks forming parts of larger cognitive and behavioral systems. Crucially, Bell contends this recurring compositional structure "demands an explanation" - it's not merely an organizational convenience but reflects fundamental principles of how complex systems operate.

### 2.2 Emergence and Submergence Operations

Bell defines two complementary information processing operations:

**Emergence**: An undercomplete mapping into a lower-dimensional space for sending messages in a more macroscopic network. This involves downsampling higher-resolution information from lower levels, not creating new information but providing compressed summaries suitable for broader distribution.

**Submergence**: An overcomplete mapping into a higher-dimensional space for sending messages in a more microscopic network. This expands compressed information into the detailed parameter space needed for fine-grained local processing.

These operations are conceptualized as mappings between vector spaces, making them amenable to analysis using machine learning techniques. Bell explicitly notes that machine learning algorithms performing similar dimensionality mappings might be useful for defining cross-level interactions and even determining what constitutes a "level."

### 2.3 The Levels Switching Network

Bell describes biological computation as occurring through a "Levels Switching Network" where:

- The entire hierarchy participates in computation, not just individual levels
- Channels and cutoffs between levels appear and disappear dynamically based on local conditions
- Local conditions determine available channels; channels determine information sources that influence local conditions
- This creates a self-organizing network topology that adapts to computational demands

### 2.4 Summarize and Broadcast

A key operational principle is that biological modules "summarize and broadcast" - they don't communicate detailed internal states to peer modules, but rather provide aggregate representations suitable for the receiving network's level of organization. For example, neurons communicate with synapses (not other whole neurons), providing summaries of their integrated activity rather than detailed intracellular states.

### 2.5 Noise as Subjective Modeling Stance

Bell argues there is "no such thing as noise" in an objective sense - causes are identified as signals, and that's all there is. Noise is subjective, resulting from taking a particular modeling stance toward a physical system. What appears as noise at one level may be meaningful signal at another level. This perspective challenges traditional signal/noise distinctions and suggests that apparent randomness often reflects cross-level information flows that aren't captured by single-level analyses.

## 3. Biological Evidence and Applications

### 3.1 Neural Systems

Bell's framework emerged from attempts to understand how neural firing patterns self-organize to code natural images in visual cortex. Density estimation algorithms (like Independent Component Analysis) successfully reproduced receptive field properties of V1 neurons, but Bell recognized that the brain's learning mechanisms operate through cross-level dynamics rather than single-level optimization.

The complexity of synaptic plasticity mechanisms - involving calcium currents, molecular signaling cascades, and gene expression changes - exemplifies cross-level information processing. Synaptic modifications depend on information from multiple levels: local neurotransmitter activity, dendritic voltage changes, and global neuromodulatory signals.

### 3.2 Cellular and Molecular Systems

Bell extends the framework to cellular organization, noting that:

- Ion channel behavior that appears "noisy" at the cellular level may be precisely controlled signaling at the molecular level
- Calcium concentrations vary meaningfully over distances of 10nm, addressing individual molecules
- Macromolecular crowding creates ordered water pathways that function as 3D switching networks
- Membrane organization involves dynamic lipid rafts controlling protein positions and interactions

### 3.3 Brain Oscillations and Multi-Scale Dynamics

Neural oscillations provide clear examples of cross-level organization:

- Delta oscillations (1-4 Hz) constrain theta oscillations (4-8 Hz)
- Theta oscillations constrain gamma oscillations (40-200 Hz)  
- Gamma oscillations determine spike timing probabilities
- This creates structured multi-scale temporal organization where each level constrains dynamics at other levels

## 4. Generalization Beyond Neuroscience

### 4.1 Universal Principles of Complex Systems

Bell's framework suggests that cross-level information processing represents a universal feature of complex adaptive systems, not just biological ones. The principles appear wherever:

- Systems exhibit hierarchical organization
- Multiple timescales of dynamics interact  
- Local and global constraints must be balanced
- Adaptive behavior emerges from component interactions

### 4.2 System Formation as Emergence/Submergence Stabilization

We propose extending Bell's framework to suggest that what we call a "system" is precisely a stable configuration of emergence/submergence relations. Systems form when information flows between levels create self-reinforcing patterns that maintain their own persistence by creating conditions for their own reproduction.

This perspective suggests that "levels" are not pre-given organizational features but emerge from the stabilization of cross-level information flows. The formation of levels and the establishment of emergence/submergence relations are the same process viewed from different perspectives.

### 4.3 Generativity as Fundamental Feature

The framework points toward a theory of abstract generativity - the capacity to produce novel, coherent, and contextually appropriate outputs. This generativity emerges from the dynamic interaction of emergence and submergence operations across multiple organizational levels, enabling systems to respond adaptively to novel situations while maintaining coherent global behavior.

## 5. Connections to AI Architectures

### 5.1 Transformer Architecture Through Bell's Lens

Current transformer architectures exhibit several features consistent with Bell's framework:

**Residual Stream as Information Substrate**: The residual stream functions as a persistent, shared information substrate that different processing levels can read from and write to, similar to Bell's description of cross-level information flows.

**Attention as Dynamic Switching**: Attention mechanisms create context-dependent information channels between tokens, resembling Bell's levels switching network where channels appear and disappear based on local conditions.

**Layer-wise Processing**: Each transformer layer performs local computation then broadcasts results back to the shared residual stream, implementing something like Bell's "summarize and broadcast" principle.

**Embedding and Prediction as Emergence/Submergence**: Input embedding creates overcomplete representations (submergence), while final prediction collapses processing to probability distributions over vocabulary (emergence).

### 5.2 Limitations of Current Architectures

Despite these similarities, current transformers lack several key features of Bell's framework:

- Limited hierarchical nesting - layers operate at similar timescales and abstraction levels
- Unidirectional processing during inference - no dynamic feedback between levels
- Fixed architecture - no dynamic formation of new organizational levels
- Single information substrate - only one residual stream rather than multiple cross-level channels

### 5.3 Implications for AI Development

Bell's framework suggests that AI systems might achieve more sophisticated capabilities by more explicitly implementing cross-level dynamics:

- Multi-timescale processing with different layers operating at different temporal cadences
- Bidirectional information flows allowing higher levels to constrain lower-level processing
- Dynamic level formation based on computational demands
- Multiple information substrates operating at different scales

## 6. Related Work

### 6.1 Autopoiesis and Enactivism

Maturana and Varela's concept of autopoiesis describes systems that maintain themselves by continuously producing their own components and boundary conditions. This connects directly to Bell's framework - autopoietic systems exhibit cross-level dynamics where molecular processes create cellular boundaries that enable the very molecular processes that produce them.

The enactivist tradition in cognitive science, extending from autopoiesis, emphasizes how cognitive systems and their environments co-specify each other through structural coupling. This resonates with Bell's emphasis on bidirectional information flows and the rejection of simple input-output models.

### 6.2 Process Philosophy and Whitehead

Alfred North Whitehead's process philosophy proposed that reality consists of processes rather than substances, with higher-level entities emerging from but also constraining lower-level processes. This anticipates Bell's framework where levels are constituted by information flows rather than fixed organizational features.

### 6.3 Renormalization Group Theory

In physics, renormalization group methods analyze how system properties change when viewed at different scales. Bell explicitly mentions RG theory as potentially relevant to understanding cross-level learning, suggesting that similar mathematical frameworks might apply to biological information processing.

RG theory deals with scale-invariant systems whose correlation functions transform predictably as resolution changes. While biological systems aren't scale-invariant (they have characteristic scales), the mathematical tools for analyzing cross-scale relationships may be adaptable.

### 6.4 Hierarchical Bayesian Models

In machine learning, hierarchical Bayesian models implement cross-level inference where higher levels provide priors for lower levels while lower levels inform posterior distributions at higher levels. This bidirectional flow of probabilistic information resembles Bell's emergence/submergence operations.

### 6.5 Free Energy Principle and Predictive Processing

Karl Friston's free energy principle proposes that biological systems minimize variational free energy through hierarchical predictive processing. This framework involves bidirectional information flows between levels - higher levels generate predictions while lower levels signal prediction errors upward.

The mathematical formalism involves precision-weighted prediction errors flowing upward (emergence) and predictions flowing downward (submergence), creating structures very similar to Bell's framework.

### 6.6 Complex Adaptive Systems Theory

The Santa Fe Institute tradition in complex adaptive systems emphasizes emergence, self-organization, and cross-scale interactions. However, most CAS models focus on bottom-up emergence without the bidirectional dynamics central to Bell's framework.

### 6.7 Integrated Information Theory

Giulio Tononi's Integrated Information Theory attempts to quantify consciousness based on how much information is generated by a system above and beyond its parts. While focused on consciousness rather than general cognition, IIT's emphasis on system-level information integration resonates with Bell's cross-level approach.

### 6.8 Multi-Scale Modeling in Biology

Systems biology has developed sophisticated multi-scale models connecting molecular, cellular, tissue, and organ levels. However, these typically model each level separately then couple them, rather than treating cross-level information flows as fundamental organizing principles.

### 6.9 Neural Scaling Laws and Emergence in AI

Recent work on scaling laws in AI has identified emergent capabilities that appear suddenly at certain model sizes. While not explicitly addressing cross-level dynamics, these findings suggest that current AI architectures may be implementing some version of the organizational principles Bell describes.

## 7. Theoretical Implications

### 7.1 Ontological Status of Levels

Bell's framework raises fundamental questions about the ontological status of organizational levels. If levels are constituted by stable patterns of emergence/submergence relations rather than pre-given material structures, this suggests a process-oriented rather than substance-oriented metaphysics.

### 7.2 Information and Causation

The framework implies that information flow and causal influence are closely related - perhaps identical. If emergence/submergence operations constitute both information processing and causal relationships, this suggests an information-theoretic approach to understanding causation in complex systems.

### 7.3 The Hard Problem of Consciousness

Bell's framework may offer new approaches to understanding consciousness by treating it as arising from particular configurations of cross-level information flows rather than from properties of individual levels. Consciousness might be a natural consequence of sufficiently rich emergence/submergence dynamics.

## 8. Methodological Implications

### 8.1 Multi-Level Experimental Design

Bell's framework suggests that understanding complex systems requires experimental approaches that can simultaneously probe multiple organizational levels and their interactions. Single-level analyses will necessarily miss the most important dynamics.

### 8.2 Computational Modeling Approaches

The framework points toward computational models that explicitly represent cross-level information flows rather than treating different levels as separate modeling concerns. This might require new mathematical and computational tools.

### 8.3 Evaluation Metrics

For AI systems, Bell's framework suggests that evaluation should focus on cross-level dynamics rather than just input-output performance. Systems with richer cross-level structure might exhibit qualitatively different capabilities even with similar benchmark performance.

## 9. Conclusion

Bell's framework of cross-level information processing offers a powerful lens for understanding complex adaptive systems, from biological cognition to artificial intelligence. The theory's emphasis on emergence/submergence operations, dynamic level formation, and bidirectional information flows provides both explanatory power for existing phenomena and guidance for developing more sophisticated AI architectures.

The convergence of similar ideas across multiple domains - from autopoiesis to renormalization group theory to hierarchical Bayesian inference - suggests that Bell has identified fundamental organizational principles of complex systems. The success of current AI architectures may reflect their accidental implementation of simplified versions of these principles.

Moving forward, explicit incorporation of Bell's framework into AI development may enable qualitatively new forms of artificial intelligence that more closely approximate the adaptive capabilities of biological systems. The key insight is that intelligence may not arise from optimization within single levels of organization, but from the dynamic interplay of information flows across multiple levels - a perspective that transforms both our understanding of natural intelligence and our approaches to creating artificial intelligence.

Understanding these principles becomes increasingly important as AI systems become more sophisticated and as we seek to understand their relationship to biological intelligence. Bell's framework provides both theoretical foundation and practical guidance for this crucial endeavor.