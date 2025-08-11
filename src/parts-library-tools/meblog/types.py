from typing import Union, List, Tuple
from dataclasses import dataclass, field
import build123d
import cadquery

@dataclass
class ParametricObjectNode:
  name: str
  material: Union[str, None] = None
  children: List['ParametricObjectNode'] = field(default_factory=list)
  vertices: List[Tuple[float, float, float]] = field(default_factory=list)
  faces: List[Tuple[int, int, int]] = field(default_factory=list)

class BlendQueryBuildException(Exception):
  def __init__(self, message):
    super().__init__(message)

ParametricShape = Union[build123d.Shape, build123d.Shape]
ParametricObject = Union[
  ParametricShape,
  cadquery.Workplane,
  cadquery.Assembly,
  build123d.Builder
]