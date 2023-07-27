import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-create-new-game',
  templateUrl: './create-new-game.component.html',
  styleUrls: ['./create-new-game.component.css']
})
export class CreateNewGameComponent implements OnInit {

  @ViewChild('word') word! : ElementRef<HTMLInputElement>;
  @ViewChild('form') form! : ElementRef<HTMLDivElement>;
  @ViewChild('letter') letter! : ElementRef<HTMLInputElement>;
  @ViewChild('containerLetter') containerLetter! : ElementRef<HTMLDivElement>;
  @ViewChildren('letterCard') letterCard! : QueryList<ElementRef>;

  wordForGame: any = ''; // string para começar o jogo
  arr: any = []; // array da palavra
  gabarito: any = []; // array da palavra sem repetição
  arrUser: any = []; // array de acertos do player
  ganhou: boolean = false; // jogo foi ganho
  errou: any = []; // array de erros do player
  tentativas: any = 0; // numero de tentativas
  arrDivs:any = []; // array de divs da palavra
  letra:string = '';


  constructor() { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void{
    this.wordForGame = this.word.nativeElement.value; // pegando palavra do input
    this.arr = this.wordForGame.split(''); // array da palavra escrita no input
    this.gabarito = [...new Set(this.arr)].sort(); // array da palavra sem repetição
  }


  getWord(): void{
    this.wordForGame = this.word.nativeElement.value; // pegando palavra do input
    this.tentativas = this.wordForGame.length*2;  // numero de tentaivas baseado na palavra
    this.arr = this.wordForGame.split(''); // array da palavra escrita no input
    this.gabarito = [...new Set(this.arr)].sort(); // array da palavra sem repetição
    this.word.nativeElement.value = '';
  }

  checkLetter(): void{

    this.letra = this.letter.nativeElement.value;

    if (this.letra == ''){
      console.log("opção invalida");
    }

    if (this.letra !== '') {
      
      if (this.arr.includes(this.letra)) {
        for (let i = 0; i < this.arr.length; i++) {

          if(this.arr[i] == this.letra){
            this.arrUser.push(this.letra);
          }

        }
        this.arrUser = [...new Set(this.arrUser)].sort(); //organizar array em ordem alfabetica
        this.ganhou = this.compararArray(this.arrUser, this.gabarito) //compara o array dos acertos com o array de gabarito 
        if(this.ganhou){console.log("GANHOU!!!!!!!")}; // imprimir ganhou se acertar todas as letras
  
      }else{

        //inserindo letra q foi errada no array errou[]
        this.errou.push(this.letra);
  
        if(this.tentativas >= 1){
          this.tentativas--;
          console.log(`Restam ${this.tentativas} tentativas`)
        }else{
          console.log("Você perdeu")
        }

      }
      
      //criando array de divs que compoe a palavra
      this.letterCard.forEach((element) => {

        if (this.gabarito.includes(this.letra)) {
          this.arrDivs.push(element);
        }

      })
      
      //estilizando as letras descobertas
      for (let i = 0; i < this.arrDivs.length; i++) {

        if (this.arrDivs[i].nativeElement.innerHTML.includes(this.letra)) {
          this.arrDivs[i].nativeElement.setAttribute('class','letter bg-green-600 text-white')
        }

      }

    }  

    this.letter.nativeElement.value = '';
  }


  // comparar dois arrays para saber se são identicos
  compararArray(arr1:any , arr2:any): boolean{
    return arr1.length === arr2.length && arr1.every((item:any, index:any) => item === arr2[index])
  }


  resetGame(){
    this.wordForGame = ''; // string para começar o jogo
    this.arr = []; // array da palavra
    this.gabarito = []; // array da palavra sem repetição
    this.arrUser = []; // array de acertos do player
    this.ganhou = false; // jogo foi ganho
    this.errou = []; // array de erros do player
    this.tentativas = 5; // numero de tentativas
    this.arrDivs = []; // array de divs da palavra
    this.letra = '';
    this.word.nativeElement.value = '';
  }

}
