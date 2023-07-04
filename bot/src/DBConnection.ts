import "reflect-metadata";
import { DataSource, In } from "typeorm";
import { Alumno, AlumnoCarrera, AlumnoMateria, Carreras, Materia, MateriaAprobada } from "./entities/Entities";
import { loadCarreras, loadData } from "./LoadDB";
import { padron } from "./commands/LogIn";

export interface MateriaOption {
  name: string;
  value: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private dataSource: DataSource;
  private static dataSrcPromise: Promise<DataSource>;
  private isConnected: boolean;

  private constructor() {
    this.dataSource = new DataSource(require("../config.json").database);
    this.isConnected = false;
    DatabaseConnection.dataSrcPromise = this.connect();
  }

  public static initializeDB() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
  }

  private connect(): Promise<DataSource> {
    if (!this.isConnected) {
      this.isConnected = true;
      return this.dataSource.initialize();
    }
    return Promise.resolve(this.dataSource);
  }

  public static loadDBData() {
    let newPromise: Promise<DataSource> | undefined;
    this.dataSrcPromise
      .then(async (ds) => {
        await loadCarreras(ds);
        const newLocal = './src/data/INFORMATICA.csv';
        await loadData(ds, newLocal);
        await loadData(ds, './src/data/ELECTRONICA.csv');
        await loadData(ds, './src/data/SISTEMAS.csv');
        newPromise = Promise.resolve(ds);
      })
      .finally(() => {
        this.dataSrcPromise = newPromise!;
      });
  }


  public static async saveAlumno(alumno: Alumno) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumno = await ds.manager.findOne(Alumno, {
        where: { padron: alumno.padron }
      });

      if (!existingAlumno) {
        ds.manager.save(alumno);
        console.log("Alumno guardado en la base de datos.");
      } else {
        console.log("El alumno ya existe en la base de datos.");
      }
    } catch (error) {
      console.error("Se produjo un error al guardar el alumno:", error);
    }
  }

  public static async saveAlumnoCarrera(alumnoCarrera: AlumnoCarrera) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumnoCarrera = await ds.manager.findOne(AlumnoCarrera, {
        where: { alumnoPadron: alumnoCarrera.alumnoPadron }
      });

      if (!existingAlumnoCarrera) {
        ds.manager.save(alumnoCarrera);
        console.log("AlumnoCarrera guardado en la base de datos.");
      } else {

        if (existingAlumnoCarrera?.carreraId != alumnoCarrera.carreraId) {
          ds.manager.save(alumnoCarrera);
          console.log("AlumnoCarrera guardado en la base de datos con tu nueva carrera.");
        } else {
          console.log("La carrera ya fue guardada.");
        }
      }
    } catch (error) {
      console.error("Se produjo un error al guardar el alumnoCarrera:", error);
    }
  }

  public static async saveAlumnoMateria(alumnoMateria: AlumnoMateria) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumnoMateria = await ds.manager.findOne(AlumnoMateria, {
        where: { alumnoPadron: alumnoMateria.alumnoPadron, materiaCodigo: alumnoMateria.materiaCodigo }
      });

      if (!existingAlumnoMateria) {
        const existingMateriaAprobada = await ds.manager.findOne(MateriaAprobada, {
          where: { alumnoPadron: alumnoMateria.alumnoPadron, materiaCodigo: alumnoMateria.materiaCodigo }
        });
        if (!existingMateriaAprobada) {
          ds.manager.save(alumnoMateria);
          console.log("AlumnoMateria guardado en la base de datos.");
        } else {
          console.log("La materia ya fue aprobada.");
        }
      } else {
        console.log("La materia ya fue cargada en la base de datos.");
      }
    } catch (error) {
      console.error("Se produjo un error al guardar el alumnoCarrera:", error);
    }
  }

  public static async saveMateriaAprobada(materiaAprobada: MateriaAprobada) {
    try {
      const ds = await this.dataSrcPromise;
      const existingMateriaAprobada = await ds.manager.findOne(MateriaAprobada, {
        where: { alumnoPadron: materiaAprobada.alumnoPadron, materiaCodigo: materiaAprobada.materiaCodigo }
      });

      if (!existingMateriaAprobada) {
        const existingMateria = await ds.manager.findOne(AlumnoMateria, {
          where: { alumnoPadron: materiaAprobada.alumnoPadron, materiaCodigo: materiaAprobada.materiaCodigo }
        });
        if (!existingMateria) {
        ds.manager.save(materiaAprobada);
        console.log("Materia aprobada guardada en la base de datos.");
        } else {
          await ds.manager.remove(AlumnoMateria, existingMateria);
          console.log("Felicitaciones! Aprobaste la materia");
        }
      } else {
        console.log("La materia ya fue aprobada.");
      }
    } catch (error) {
      console.error("Se produjo un error al guardar la materia aprobada:", error);
    }
  }

  public static async darBajaMateria(materia: AlumnoMateria) {
    try {
      const ds = await this.dataSrcPromise;
      const existingMateria = await ds.manager.findOne(AlumnoMateria, {
        where: { alumnoPadron: materia.alumnoPadron, materiaCodigo: materia.materiaCodigo }
      });

      if (existingMateria) {
        await ds.manager.remove(AlumnoMateria, existingMateria);
        console.log("Se ha dado de baja de la materia ingresada.");
      } else {
        console.log("La materia no fue cargada, por lo que no puede darse de baja.");
      }
    } catch (error) {
      console.error("Se produjo un error al eliminar la materia:", error);
    }
  }


  public static async getCodigoMateriaPorNombre(nombre: string): Promise<string | null> {
    try {
      const ds = await this.dataSrcPromise;
      const materia = await ds.manager.findOne(Materia, { where: { nombre } });

      if (materia) {
        return materia.codigo;
      } else {
        console.log("No se encontró ninguna materia con ese nombre.");
        return null;
      }
    } catch (error) {
      console.error("Se produjo un error al obtener el código de la materia:", error);
      return null;
    }
  }

  public static async getNombreMateriasPorCodigo(codigos: string[]): Promise<string[] | Error> {
    try {
      console.log("Obteniendo materias: ", codigos);
      const ds = await this.dataSrcPromise;
      const materias: string[] = [];
      const carrerasDelAlumno = await this.getCarrerasId(padron!);
      if (carrerasDelAlumno.length === 0) {
        throw new Error("No se encontró ninguna carrera para el alumno.");
      }
      for (const codigo of codigos) {
        const materia = await ds.manager.findOne(Materia, {
          where: {
            codigo: codigo,
            carrera: In(carrerasDelAlumno)
          }
        });
        if (materia?.nombre) {
          materias.push(materia.nombre);
        }
      }

      if (materias.length === 0) {
        throw new Error("No se encontró ninguna materia con ese nombre.");
      }

      return materias;
    } catch (error) {
      console.error("Se produjo un error al obtener el código de la materia:", error);
      throw new Error("Se produjo un error al obtener el código de la materia: " + error);
    }
  }


  public static async getAllMateriasPorCarreras(): Promise<MateriaOption[]> {
    try {
      const ds = await this.dataSrcPromise;
      if (padron) {
        let carreraAlumno: AlumnoCarrera[] = await ds.manager.find(AlumnoCarrera, { where: { alumnoPadron: padron } });
        const carreraIds = carreraAlumno.map((ac) => ac.carreraId);
        if (carreraIds.length > 0) {
          console.log("Carreras del alumno:", carreraIds);
          const materias: Materia[] = await ds.manager
            .createQueryBuilder(Materia, "materia")
            .where("materia.carreraId IN (:...carreraIds)", { carreraIds })
            .getMany();
          const opcionesMateria: MateriaOption[] = materias.map((opcion) => ({
            name: opcion.nombre,
            value: opcion.codigo,
          }));
          return await opcionesMateria;
        }
      }
      return [];
    } catch (error) {
      console.error("Se produjo un error al obtener todas las materias:", error);
      return [];
    }
  }

  public static async getAllMaterias(): Promise<MateriaOption[]> {
    try {
      const ds = await this.dataSrcPromise;
      const materias = await ds.manager.find(Materia);
      const opcionesMateria: MateriaOption[] = materias.map((opcion) => ({
        name: opcion.nombre,
        value: opcion.nombre,
      }));
      return await opcionesMateria;
    } catch (error) {
      console.error("Se produjo un error al obtener todas las materias:", error);
      return [];
    }
  }

  public static async getCorrelativas(codigoMateria: string): Promise<string[] | null> {
    try {
      const ds = await this.dataSrcPromise;
      const materia = await ds.manager.findOne(Materia, { where: { codigo: codigoMateria } });

      if (materia && materia.correlativas) {
        return materia.correlativas.split("-");
      } else {
        console.log("No se encontraron correlativas para la materia con ese código.");
        return null;
      }
    } catch (error) {
      console.error("Se produjo un error al obtener las correlativas de la materia:", error);
      return null;
    }
  }

  public static async getAlumnoMaterias(padron: number): Promise<string[]> {
    try {
      const ds = await this.dataSrcPromise;
      const alumnoMaterias = await ds.manager.find(AlumnoMateria, { where: { alumnoPadron: padron } });

      return alumnoMaterias.map(alumnoMateria => alumnoMateria.materiaCodigo);
    } catch (error) {
      console.error("Se produjo un error al obtener las materias del alumno:", error);
      return [];
    }
  }

  public static async getAlumnoMateriasAprobadas(padron: number): Promise<string[]> {
    try {
      const ds = await this.dataSrcPromise;
      const alumnoMaterias = await ds.manager.find(MateriaAprobada, { where: { alumnoPadron: padron } });

      return alumnoMaterias.map(alumnoMateria => alumnoMateria.materiaCodigo);
    } catch (error) {
      console.error("Se produjo un error al obtener las materias del alumno:", error);
      return [];
    }
  }




  public static async getCodigosMateriasPorNombre(nombre: string): Promise<string[]> {
    try {
      const ds = await this.dataSrcPromise;
      const materias = await ds.manager.find(Materia, { where: { nombre } });
      if (materias) {
        const codigosMaterias = materias.map((materia) => materia.codigo);
        return codigosMaterias;
      } else {
        console.log("No se encontró ninguna materia con ese nombre.");
        return [];
      }
    } catch (error) {
      console.error("Se produjo un error al obtener el código de la materia:", error);
      return [];
    }
  }

  public static async getCodigoMateriaPorNombreYCodigo(nombre: string, carrera: number): Promise<string> {
    try {
      const ds = await this.dataSrcPromise;
      const materia = await ds.manager.findOne(Materia, { where: { nombre, carrera: { id: carrera } } });
      if (materia) {
        return materia.codigo;
      } else {
        console.log("No se encontró ninguna materia con ese nombre.");
        return "";
      }
    } catch (error) {
      console.error("Se produjo un error al obtener el código de la materia:", error);
      return "";
    }
  }

  public static async getCarrerasId(padron: number): Promise<number[]> {
    try {
      const ds = await this.dataSrcPromise;
      const alumnoCarreras = await ds.manager.find(AlumnoCarrera, { where: { alumnoPadron: padron } });

      if (!alumnoCarreras || alumnoCarreras.length === 0) {
        return [];
      }

      else {
        const carreraIds = alumnoCarreras.map((ac) => ac.carreraId);
        return carreraIds;
      }
    } catch (error) {
      console.error("Se produjo un error al obtener la carrera del alumno:", error);
      return [];
    }
  }

  public static async getNombreCarreraPorCodigo(codigo: number): Promise<string> {
    try {
      const ds = await this.dataSrcPromise;
      const carrera = await ds.manager.findOne(Carreras, { where: { id: codigo } });

      if (!carrera) {
        return "";
      }

      else {
        return carrera.nombre;
      }
    } catch (error) {
      console.error("Se produjo un error al obtener la carrera del alumno:", error);
      return "";
    }
  }










}
