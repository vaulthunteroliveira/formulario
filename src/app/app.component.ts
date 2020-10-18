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

  legislacaoSelected: any;

  legislacaoSelectedUpload: any;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    public confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.carregaCombos();
  }

  ngOnInit() {
    this.loadForm();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      alert("Allahu Akbar!! Allahu Akbar!!");
      return;
    }

    if (this.legislacaoSelected) {
      this.service.update(this.form.value, this.legislacaoSelected.id).subscribe(res => {
        this.carregaCombos();
        this.form.reset()
        this.legislacaoSelected = null;
      },
        erro => console.log(erro));
    } else {
      this.service.save(this.form.value).subscribe(res => {
        this.carregaCombos();
        this.form.reset()
      },
        erro => console.log(erro));
    }


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
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          },
          (erro) => console.log(erro)
        );
      },
    });
  }

  edit(legislacao: any): void {
    this.form.reset()

    this.legislacaoSelected = null

    this.legislacaoSelected = legislacao;

    this.form.patchValue(
      {
        'data': this.legislacaoSelected.data.substr(0, 10),
        'descricao': this.legislacaoSelected.descricao,
        'numeroAto': this.legislacaoSelected.numeroAto,
        'ano': this.legislacaoSelected.ano,
        'flagAtivo': this.legislacaoSelected.flagAtivo,
        'categoriaLegislacao': this.legislacaoSelected.categoriaLegislacaoList[0].id,
        'tipoLegislacao': this.legislacaoSelected.tipoLegislacao.id
      }
    )
  }

  printaValor(event) {
    console.log(event.target.value)
  }

  truncate(str, n) {
    return str.length > n ? `${str.substr(0, n - 1)}...` : str;
  }

  loadForm() {
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

  limparFormulario(event) {
    event.preventdefault();
    this.form.reset();
  }
}
