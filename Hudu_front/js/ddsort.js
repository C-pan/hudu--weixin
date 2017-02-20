;(function( $ ){
    /**
     * Author: https://github.com/Barrior
     *
     * DDSort: drag and drop sorting.
     * @param {Object} options
     *        target[string]: 		��ѡ��jQuery�¼�ί��ѡ�����ַ�����Ĭ��'li'
     *        cloneStyle[object]: 	��ѡ������ռλ��Ԫ�ص���ʽ
     *        floatStyle[object]: 	��ѡ�������϶�Ԫ�ص���ʽ
     *        down[function]: 		��ѡ����갴��ʱִ�еĺ���
     *        move[function]: 		��ѡ������ƶ�ʱִ�еĺ���
     *        up[function]: 		��ѡ�����̧��ʱִ�еĺ���
     */
    $.fn.DDSort = function( options ){
        var $doc = $( document ),
            fnEmpty = function(){},

            settings = $.extend( true, {

                down: fnEmpty,
                move: fnEmpty,
                up: fnEmpty,

                target: 'li',
                cloneStyle: {
                    'background-color': '#eee'
                },
                floatStyle: {
                    //�ù̶���λ���Է�ֹ��λ��������Body������ļ��ݴ�����ʾ������IE6���޷�
                    'position': 'fixed',
                    'box-shadow': '10px 10px 20px 0 #eee',
                    'webkitTransform': 'rotate(4deg)',
                    'mozTransform': 'rotate(4deg)',
                    'msTransform': 'rotate(4deg)',
                    'transform': 'rotate(4deg)'
                }

            }, options );

        return this.each(function(){

            var that = $( this ),
                height = 'height',
                width = 'width';

            if( that.css( 'box-sizing' ) == 'border-box' ){
                height = 'outerHeight';
                width = 'outerWidth';
            }

            that.on( 'mousedown.DDSort', settings.target, function( e ){
                //ֻ�����������϶�
                if( e.which != 1 ){
                    return;
                }

                //��ֹ��Ԫ��ʧЧ
                var tagName = e.target.tagName.toLowerCase();
                if( tagName == 'input' || tagName == 'textarea' || tagName == 'select' ){
                    return;
                }

                var THIS = this,
                    $this = $( THIS ),
                    offset = $this.offset(),
                    disX = e.pageX - offset.left,
                    disY = e.pageY - offset.top,

                    clone = $this.clone()
                        .css( settings.cloneStyle )
                        .css( 'height', $this[ height ]() )
                        .empty(),

                    hasClone = 1,

                //�������
                    thisOuterHeight = $this.outerHeight(),
                    thatOuterHeight = that.outerHeight(),

                //�����ٶ�
                    upSpeed = thisOuterHeight,
                    downSpeed = thisOuterHeight,
                    maxSpeed = thisOuterHeight * 3;

                settings.down.call( THIS );

                $doc.on( 'mousemove.DDSort', function( e ){
                    if( hasClone ){
                        $this.before( clone )
                            .css( 'width', $this[ width ]() )
                            .css( settings.floatStyle )
                            .appendTo( $this.parent() );

                        hasClone = 0;
                    }

                    var left = e.pageX - disX,
                        top = e.pageY - disY,

                        prev = clone.prev(),
                        next = clone.next().not( $this );

                    $this.css({
                        left: left,
                        top: top
                    });

                    //��������
                    if( prev.length && top < prev.offset().top + prev.outerHeight()/2 ){

                        clone.after( prev );

                        //��������
                    }else if( next.length && top + thisOuterHeight > next.offset().top + next.outerHeight()/2 ){

                        clone.before( next );

                    }

                    /**
                     * ���������
                     * that�Ǵ��Ź�������Ԫ�أ�����Ĭ����ΪthatԪ����������Ԫ�أ�����������������������ʹ�����¼�ί�е�Ԫ�ز���������Ԫ�أ���ô��Ҫ�ṩ�ӿڳ���
                     */
                    var thatScrollTop = that.scrollTop(),
                        thatOffsetTop = that.offset().top,
                        scrollVal;

                    //���Ϲ���
                    if( top < thatOffsetTop ){

                        downSpeed = thisOuterHeight;
                        upSpeed = ++upSpeed > maxSpeed ? maxSpeed : upSpeed;
                        scrollVal = thatScrollTop - upSpeed;

                        //���¹���
                    }else if( top + thisOuterHeight - thatOffsetTop > thatOuterHeight ){

                        upSpeed = thisOuterHeight;
                        downSpeed = ++downSpeed > maxSpeed ? maxSpeed : downSpeed;
                        scrollVal = thatScrollTop + downSpeed;
                    }

                    that.scrollTop( scrollVal );

                    settings.move.call( THIS );

                })
                    .on( 'mouseup.DDSort', function(){

                        $doc.off( 'mousemove.DDSort mouseup.DDSort' );

                        //click��ʱ��Ҳ�ᴥ��mouseup�¼��������ж���ֹ�������
                        if( !hasClone ){
                            clone.before( $this.removeAttr( 'style' ) ).remove();
                            settings.up.call( THIS );
                        }
                    });

                return false;
            });
        });
    };

})( jQuery );