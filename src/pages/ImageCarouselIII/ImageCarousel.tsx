import ProjectLayout from '../../components/ProjectLayout';
import ImageCarouselContainer from './containers/ImageCarouselContainer';
import './styles.css'; // relative to ImageCarouselIIII or adjust path

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export default function ImageCarousel() {
  return (
    <ProjectLayout currentPath="/image-carousel-iii">
      <ImageCarouselContainer images={images} />
    </ProjectLayout>
  );
}
