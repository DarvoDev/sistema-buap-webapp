import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { ListMateriasComponent } from './list-materias/list-materias.component';
import { RegisterMateriaComponent } from './register-materia/register-materia.component';


const routes: Routes = [
  // Pantalla principal del login
  { path: '', component: LoginScreenComponent }, // Ruta inicial al login
  { path: 'registro-usuarios', component: RegistroUsuariosScreenComponent, pathMatch: 'full' },
  { path: 'registro-usuarios/:rol/:id', component: RegistroUsuariosScreenComponent, pathMatch: 'full'},
  { path: 'home', component: HomeScreenComponent },
  { path: 'alumnos', component: AlumnosScreenComponent },
  { path: 'maestros', component: MaestrosScreenComponent },
  { path: 'administrador', component: AdminScreenComponent },
  { path: 'graficas', component: GraficasScreenComponent },
  { path: 'lista-materias', component: ListMateriasComponent }, 
  { path: 'registrar-materia', component: RegisterMateriaComponent},
  { path: 'registrar-materia/:id', component: RegisterMateriaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
