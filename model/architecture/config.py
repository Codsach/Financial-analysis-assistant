"""
Financial LLM Model Configuration (20M - 40M parameter decoder-only transformer)
"""

from dataclasses import dataclass

@dataclass
class FinancialModelConfig:
    vocab_size: int = 16000
    context_window: int = 512
    n_layer: int = 6
    n_head: int = 6
    n_embd: int = 384
    dropout: float = 0.1
    bias: bool = False
