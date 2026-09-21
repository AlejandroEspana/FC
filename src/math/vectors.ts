/**
 * src/math/vectors.ts
 * Capa matemática pura de operaciones vectoriales en R² y R³.
 * Desacoplada al 100% de cualquier framework visual.
 */

export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export type AnyVector = Vector2 | Vector3;

export function isVector3(v: AnyVector): v is Vector3 {
  return "z" in v && typeof (v as Vector3).z === "number";
}

// 1. Creación e instanciación
export const vec2 = (x: number, y: number): Vector2 => ({ x, y });
export const vec3 = (x: number, y: number, z: number): Vector3 => ({ x, y, z });

// 2. Suma vectorial
export function addVectors<T extends AnyVector>(a: T, b: T): T {
  if (isVector3(a) && isVector3(b)) {
    return vec3(a.x + b.x, a.y + b.y, a.z + b.z) as unknown as T;
  }
  const a2 = a as Vector2;
  const b2 = b as Vector2;
  return vec2(a2.x + b2.x, a2.y + b2.y) as unknown as T;
}

// 3. Resta vectorial (Desplazamiento relativo de b a a: a - b)
export function subtractVectors<T extends AnyVector>(a: T, b: T): T {
  if (isVector3(a) && isVector3(b)) {
    return vec3(a.x - b.x, a.y - b.y, a.z - b.z) as unknown as T;
  }
  const a2 = a as Vector2;
  const b2 = b as Vector2;
  return vec2(a2.x - b2.x, a2.y - b2.y) as unknown as T;
}

// 4. Escalamiento por escalar real c
export function scaleVector<T extends AnyVector>(v: T, c: number): T {
  if (isVector3(v)) {
    return vec3(v.x * c, v.y * c, v.z * c) as unknown as T;
  }
  const v2 = v as Vector2;
  return vec2(v2.x * c, v2.y * c) as unknown as T;
}

// 5. Norma euclidiana o Magnitud (|v| = sqrt(sum v_i^2))
export function vectorMagnitude(v: AnyVector): number {
  if (isVector3(v)) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// 6. Normalización / Vector Unitario (u = v / |v|)
export function normalizeVector<T extends AnyVector>(v: T): T {
  const mag = vectorMagnitude(v);
  if (mag === 0) {
    throw new Error("No se puede normalizar el vector nulo (longitud cero)");
  }
  return scaleVector(v, 1 / mag);
}

// 7. Ángulo de dirección polar en R² (en radianes y grados, con ajuste de cuadrante atan2)
export function vectorAngleRadians(v: Vector2): number {
  return Math.atan2(v.y, v.x);
}

export function vectorAngleDegrees(v: Vector2): number {
  const deg = (Math.atan2(v.y, v.x) * 180) / Math.PI;
  return deg >= 0 ? deg : deg + 360;
}

// 8. Producto Punto / Escalar (u · v = sum u_i * v_i)
export function dotProduct(a: AnyVector, b: AnyVector): number {
  if (isVector3(a) && isVector3(b)) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  const a2 = a as Vector2;
  const b2 = b as Vector2;
  return a2.x * b2.x + a2.y * b2.y;
}

// 9. Ángulo entre dos vectores (theta = arccos((u · v) / (|u||v|)))
export function angleBetweenVectors(a: AnyVector, b: AnyVector): number {
  const magA = vectorMagnitude(a);
  const magB = vectorMagnitude(b);
  if (magA === 0 || magB === 0) {
    throw new Error("El ángulo no está definido para vectores con magnitud nula");
  }
  const cosTheta = Math.max(-1, Math.min(1, dotProduct(a, b) / (magA * magB)));
  return Math.acos(cosTheta);
}

// 10. Proyección escalar de u sobre v: comp_v(u) = (u · v) / |v|
export function scalarProjection(u: AnyVector, v: AnyVector): number {
  const magV = vectorMagnitude(v);
  if (magV === 0) throw new Error("No se puede proyectar sobre el vector nulo");
  return dotProduct(u, v) / magV;
}

// 11. Proyección vectorial de u sobre v: proj_v(u) = ((u · v) / |v|²) * v
export function vectorProjection<T extends AnyVector>(u: T, v: T): T {
  const magV = vectorMagnitude(v);
  if (magV === 0) throw new Error("No se puede proyectar sobre el vector nulo");
  const factor = dotProduct(u, v) / (magV * magV);
  return scaleVector(v, factor);
}

// 12. Producto Cruz / Vectorial en R³ (w = a × b)
export function crossProduct(a: Vector3, b: Vector3): Vector3 {
  return vec3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
}

// 13. Pseudo-producto cruz en R² (área con signo del paralelogramo: a_x * b_y - a_y * b_x)
export function crossProduct2D(a: Vector2, b: Vector2): number {
  return a.x * b.y - a.y * b.x;
}
