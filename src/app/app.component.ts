import { ConfirmationService, MessageService } from "primeng/api";
import { AppService } from "./app.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  legislacaoList: any[];

  categorias: any[];

  tipoLegislacaoList: any[];

  name = "formulario";

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    public confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.carregaCombos();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      data: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      numeroAto: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      tipoLegislacao: [null, [Validators.required]],
      categoriaLegislacao: [null, [Validators.required]],
      flagAtivo: [null],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      // this.showModal(
      //   "Algumas informações não foram aceitas, favor corrija-as para continuar!"
      // );
      alert("Allahu Akbar!! Allahu Akbar!!");
      return;
    }

    this.service.save(this.form.value).subscribe(res => {
      this.carregaCombos();
      this.form.reset()
    },
    erro => console.log(erro) );
  }

  carregaCombos() {
    this.service.findAllCategorias().subscribe((res) => {
      this.categorias = res.map((e) => {
        return { label: e.descricao, value: e.id };
      });
    });

    this.service.findAllTipoLegislacao().subscribe((res) => {
      this.tipoLegislacaoList = res.map((e) => {
        return { label: e.descricao, value: e.id };
      });
    });

    this.service
      .findAllLegislacao()
      .subscribe((res) => (this.legislacaoList = res));
  }

  delete(legislacao: any): void {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir a(o) ${legislacao.tipoLegislacao.sigla} de código ${legislacao.id}?`,
      header: "Atenção!",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(legislacao.id);
        this.service.delete(legislacao.id).subscribe(
          (e) => {
            this.carregaCombos();
            legislacao = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          },
          (erro) => console.log(erro)
        );
        //
        // this.products = this.products.filter(val => val.id !== product.id);
        // 
        // 
      },
    });
  }

  truncate(str, n) {
    return str.length > n ? `${str.substr(0, n - 1)}...` : str;
  }
}
