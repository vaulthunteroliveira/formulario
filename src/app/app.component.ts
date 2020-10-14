import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  form : FormGroup;

  categorias: any[];
  categoriaSelecionada: any;

  tipoLegislacaoList: any[];
  tipoLegislacaoSelecionada: any;

  name = 'formulario';

  constructor(
    private formBuilder : FormBuilder,
    public service: AppService
  ) {}

  ngOnInit(){

    this.service.findAllCategorias().subscribe(res => {
      
      this.categorias = res.map( e => {
        return {label: e.descricao, value: e } 
      })
    })

    this.service.findAllTipoLegislacao().subscribe(res => {
      
      this.tipoLegislacaoList = res.map( e => {
        return {label: e.descricao, value: e } 
      })
    })

    this.form = this.formBuilder.group
    ({
      data : [null,[Validators.required]],
      descricao : [null,[Validators.required]],
      numeroAto : [null,[Validators.required]],
      ano : [null,[Validators.required]],
      arquivo : [null,[Validators.required]],
      tipoLegislacao : [null,[Validators.required]],
      categoriaLegislacao : [null,[Validators.required]],
    })
  }

  onSubmit() : void
  {
    
    // if(!this.form.value.termo || !this.form.valid)
    // {
    //   this.aposSubmit = true;
    //   this.showModal('Algumas informações não foram aceitas, favor corrija-as para continuar!');
    //   return;
    // }
    
    this.service.save(this.form.value);
    
  }

}
