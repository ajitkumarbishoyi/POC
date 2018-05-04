import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

declare var $: any;
declare var ImageViewer: any;

/**
 * @author Breno Prata - 22/12/2017
 */
@Component({
  moduleId: module.id,
    selector: 'app-image-viewer',

    templateUrl: 'image-viewer.component.html',

    styleUrls: ['image-viewer.component.scss']
})
export class ImageViewerComponent implements OnChanges, OnInit, AfterViewInit {

    BASE_64_IMAGE = 'data:image/png;base64,';
    BASE_64_PNG = `${this.BASE_64_IMAGE} `;
    BASE_64_PDF = 'data:application/pdf;base64, ';
    ROTACAO_PADRAO_GRAUS = 90;
    TOTAL_ROTACAO_GRAUS_VERTICAL = this.ROTACAO_PADRAO_GRAUS * 3;

    @Input() idContainer;
    @Input() images: any[];
    @Input() rotate = true;
    @Input() download = true;
    @Input() fullscreen = true;
    @Input() resetZoom = true;
    @Input() loadOnInit = false;
    @Input() showOptions = true;
    @Input() showPDFOnlyOption = true;
    @Input() primaryColor = '#0176bd';
    @Input() buttonsColor = 'white';
    @Input() buttonsHover = '#333333';
    @Input() defaultDownloadName = 'Image';
    @Input() rotateRightTooltipLabel = 'Rotate right';
    @Input() rotateLeftTooltipLabel = 'Rotate left';
    @Input() resetZoomTooltipLabel = 'Reset zoom';
    @Input() fullscreenTooltipLabel = 'Fullscreen';
    @Input() downloadTooltipLabel = 'Download';
    @Input() showPDFOnlyLabel = 'Show only PDF';
    @Input() enableTooltip = true;

    @Output() onNext = new EventEmitter();
    @Output() onPrevious = new EventEmitter();

    viewer;
    wrapper;
    curSpan;
    viewerFullscreen;
    totalImagens: number;
    indexImagemAtual: number;
    rotacaoImagemAtual: number;
    stringDownloadImagem: string;
    isImagemVertical: boolean;
    mostrarPainelOpcoes = true;
    showOnlyPDF = false;

    ngOnInit() {
        if (this.loadOnInit) {
            this.isImagensPresentes();
        }
    }

    ngAfterViewInit() {
        this.inicializarCores();
        if (this.loadOnInit) {
            this.inicializarImageViewer();
            setTimeout(() => {
                this.showImage();
            }, 1000);
        }
    }

    private inicializarCores() {
        $('.inline-icon').css('background-color', this.primaryColor);
        $('.footer-info').css('background-color', this.primaryColor);
        $('.footer-icon').css('color', this.buttonsColor);
        $('.footer-icon').hover(function () {
            $(this).css('color', this.buttonsHover);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.imagesChange(changes);
        this.primaryColorChange(changes);
        this.buttonsColorChange(changes);
        this.buttonsHoverChange(changes);
        this.defaultDownloadNameChange(changes);
    }

    primaryColorChange(changes: SimpleChanges) {
        if (changes['primaryColor'] || changes['showOptions']) {
            setTimeout(() => {
                $('.inline-icon').css('background-color', this.primaryColor);
                $('.footer-info').css('background-color', this.primaryColor);
            }, 350);
        }
    }

    buttonsColorChange(changes: SimpleChanges) {
        if (changes['buttonsColor'] || changes['rotate'] || changes['download']
        || changes['fullscreen']) {
            setTimeout(() => {
                $('.footer-icon').css('color', this.buttonsColor);
            }, 350);
        }
    }

    buttonsHoverChange(changes: SimpleChanges) {
        if (changes['buttonsHover']) {
            $('.footer-icon').hover(function(){
                $(this).css('color', this.buttonsHover);
            });
        }
    }

    defaultDownloadNameChange(changes: SimpleChanges) {
        if (changes['defaultDownloadName']) {
            this.defaultDownloadName = this.defaultDownloadName;
        }
    }

    imagesChange(changes: SimpleChanges) {
        if (changes['images'] && this.isImagensPresentes()) {
            this.inicializarImageViewer();
            setTimeout(() => {
                this.showImage();
            }, 1000);
        }
    }

    isImagensPresentes() {
        return this.images
            && this.images.length > 0;
    }

    inicializarImageViewer() {
        this.indexImagemAtual = 1;
        this.totalImagens = this.images.length;
        this.wrapper = $(`#${this.idContainer}`);
        this.curSpan = this.wrapper.find('.current');
        this.viewer = ImageViewer(this.wrapper.find('.image-container'));
        this.wrapper.find('.total').html(this.totalImagens);
        this.rotacaoImagemAtual = 0;
    }

    showImage() {
        this.prepararTrocaImagem();

        let imgObj = this.BASE_64_PNG;
        if (this.isPDF()) {
            this.carregarViewerPDF();
        } else {
            imgObj = this.BASE_64_PNG + this.getImagemAtual();
            this.stringDownloadImagem = this.BASE_64_IMAGE + this.getImagemAtual();
        }
        this.viewer.load(imgObj, imgObj);
        this.curSpan.html(this.indexImagemAtual);
        this.inicializarCores();
    }

    carregarViewerPDF() {
        this.esconderBotoesImageViewer();
        const {widthIframe, heightIframe} = this.getTamanhoIframe();
        this.injetarIframe(widthIframe, heightIframe);
    }

    injetarIframe(widthIframe: number, heightIframe: number) {
        $(`<iframe class="iframeViewer"
        style="width: ${widthIframe}px; height: ${heightIframe}px"
        src="${this.converterPDFBase64ParaBlob()}"
       </iframe>`).appendTo('.iv-image-wrap');
    }

    getTamanhoIframe() {
        const widthIframe = parseFloat($(`#${this.idContainer}`).css('width'));
        const heightIframe = parseFloat($(`#${this.idContainer}`).css('height'));
        return {widthIframe, heightIframe};
    }

    esconderBotoesImageViewer() {
        $('.iv-loader').css('visibility', 'hidden');
        $('.options-image-viewer').css('visibility', 'hidden');
    }

    isPDF() {
        return this.getImagemAtual().startsWith('JVBE') || this.getImagemAtual().startsWith('0M8R');
    }

    prepararTrocaImagem() {
        this.rotacaoImagemAtual = 0;
        this.limparCacheElementos();
    }

    limparCacheElementos() {
        $('.iframeViewer').remove();
        $('.iv-large-image').remove();
        $('.iv-loader').css('visibility', 'auto');
        $('.options-image-viewer').css('visibility', 'inherit');
    }

    getPdfBase64(): string {
        return `${this.BASE_64_PDF}${this.getImagemAtual()}`;
    }

    proximaImagem() {
        this.isImagemVertical = false;
        this.indexImagemAtual++;
        if (this.indexImagemAtual > this.totalImagens) {
            this.indexImagemAtual = 1;
        }
        this.onNext.emit(this.indexImagemAtual);
        if (!this.isPDF() && this.showOnlyPDF) {
            this.proximaImagem();
            return;
        }
        this.showImage();
    }

    imagemAnterior() {
      alert('ajit');
        this.isImagemVertical = false;
        this.indexImagemAtual--;
        if (this.indexImagemAtual <= 0) {
            this.indexImagemAtual = this.totalImagens;
        }
        this.onPrevious.emit(this.indexImagemAtual);
        if (!this.isPDF() && this.showOnlyPDF) {
            this.imagemAnterior();
            return;
        }
        this.showImage();
    }

    rotacionarDireita() {
        const timeout = this.resetarZoom();
        setTimeout(() => {
            this.rotacaoImagemAtual += this.ROTACAO_PADRAO_GRAUS;
            this.isImagemVertical = !this.isImagemVertical;
            this.atualizarRotacao();
        }, timeout);
    }

    rotacionarEsquerda() {
        const timeout = this.resetarZoom();
        setTimeout(() => {
            this.rotacaoImagemAtual -= this.ROTACAO_PADRAO_GRAUS;
            this.isImagemVertical = !this.isImagemVertical;
            this.atualizarRotacao();
        }, timeout);
    }

    resetarZoom(): number {
        const defaultZoom = 100;
        this.viewer.zoom(defaultZoom);
        let timeout = 800;
        if (this.viewer.zoomValue === defaultZoom) {
            timeout = 0;
        }
        return timeout;
    }

    atualizarRotacao(isAnimacao = true) {
        let scale = '';
        if (this.isImagemVertical && this.isImagemSobrepondoNaVertical()) {
            scale = `scale(${this.getScale()})`;
        }
        const novaRotacao = `rotate(${this.rotacaoImagemAtual}deg)`;
        this.carregarImagem(novaRotacao, scale, isAnimacao);
    }

    getScale() {
        return (parseFloat($('.iv-large-image').css('width')) - (parseFloat($(`#${this.idContainer}`).css('height')))) * 2.3 / (parseFloat($(`#${this.idContainer}`).css('height')));
    }

    isImagemSobrepondoNaVertical() {
        const margemErro = 5;
        return parseFloat($(`#${this.idContainer}`).css('height')) < parseFloat($('.iv-large-image').css('width')) + margemErro;
    }

    carregarImagem(novaRotacao: string, scale: string, isAnimacao = true) {
        if (isAnimacao) {
            this.adicionarAnimacao('.iv-snap-image');
            this.adicionarAnimacao('.iv-large-image');
        }
        this.adicionarRotacao('.iv-snap-image', novaRotacao, scale);
        this.adicionarRotacao('.iv-large-image', novaRotacao, scale);
        setTimeout(() => {
            if (isAnimacao) {
                this.retirarAnimacao('.iv-snap-image');
                this.retirarAnimacao('.iv-large-image');
            }
        }, 501);
    }

    retirarAnimacao(componente: string) {
        $(componente).css({'transition': `auto`});
    }

    adicionarRotacao(componente: string, novaRotacao: string, scale: string) {
        $(componente).css({'transform': `${novaRotacao} ${scale}`});
    }

    adicionarAnimacao(componente: string) {
        $(componente).css({'transition': `0.5s linear`});
    }

    mostrarFullscreen() {
        const timeout = this.resetarZoom();
        setTimeout(() => {
            this.viewerFullscreen = ImageViewer();
            const imgSrc = this.BASE_64_PNG + this.getImagemAtual();
            this.viewerFullscreen.show(imgSrc, imgSrc);
            this.atualizarRotacao(false);
        }, timeout);
    }

    converterPDFBase64ParaBlob() {

        const arrBuffer = this.base64ToArrayBuffer(this.getImagemAtual());

        const newBlob = new Blob([arrBuffer], { type: 'application/pdf' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        return window.URL.createObjectURL(newBlob);
    }

    private getImagemAtual() {
        return this.images[this.indexImagemAtual - 1];
    }

    base64ToArrayBuffer(data) {
        const binaryString = window.atob(data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    showPDFOnly() {
        this.showOnlyPDF = !this.showOnlyPDF;
        this.proximaImagem();
    }

}
